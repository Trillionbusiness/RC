
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import * as cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { sessionId } = cookie.parse(req.headers.cookie || '');

        if (sessionId) {
            // Delete the session from the database
            await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
        }

        // Expire the session cookie
        res.setHeader('Set-Cookie', cookie.serialize('sessionId', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            expires: new Date(0), // Set to a past date
            path: '/',
        }));

        res.status(200).json({ message: 'Logged out successfully.' });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}