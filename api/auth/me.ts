
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import * as cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { sessionId } = cookie.parse(req.headers.cookie || '');

        if (!sessionId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const { rows } = await sql`
            SELECT u.id, u.username
            FROM users u
            JOIN sessions s ON u.id = s.user_id
            WHERE s.id = ${sessionId} AND s.expires_at > NOW()
        `;

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid or expired session' });
        }

        const user = rows[0];
        res.status(200).json({ user });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
