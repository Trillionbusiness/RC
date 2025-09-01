
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { compare } from 'bcryptjs';
import * as cookie from 'cookie';

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find the user by username
        const { rows } = await sql`SELECT id, username, password_hash FROM users WHERE username = ${username}`;
        
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = rows[0];

        // Compare the provided password with the stored hash
        const isPasswordValid = await compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Create a new session
        const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);
        const sessionResult = await sql`
            INSERT INTO sessions (user_id, expires_at) 
            VALUES (${user.id}, ${expiresAt.toISOString()}) 
            RETURNING id`;
        
        const sessionId = sessionResult.rows[0].id;

        // Set the session cookie
        res.setHeader('Set-Cookie', cookie.serialize('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: SESSION_DURATION_SECONDS,
            path: '/',
        }));

        res.status(200).json({ user: { id: user.id, username: user.username } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}