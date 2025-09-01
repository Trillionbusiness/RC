
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Check if user already exists
        const { rows: existingUsers } = await sql`SELECT id FROM users WHERE username = ${username}`;
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const passwordHash = await hash(password, SALT_ROUNDS);

        // Insert new user into the database
        await sql`
            INSERT INTO users (username, password_hash) 
            VALUES (${username}, ${passwordHash})
        `;

        res.status(201).json({ message: 'User created successfully.' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}