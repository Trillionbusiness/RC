
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import * as cookie from 'cookie';

// Helper function to get user from session
async function getUserFromSession(req: VercelRequest) {
    const { sessionId } = cookie.parse(req.headers.cookie || '');
    if (!sessionId) return null;

    const { rows } = await sql`
        SELECT u.id, u.username
        FROM users u
        JOIN sessions s ON u.id = s.user_id
        WHERE s.id = ${sessionId} AND s.expires_at > NOW()
    `;
    return rows.length > 0 ? rows[0] : null;
}


export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromSession(req);

    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.method === 'GET') {
        // Load the user's plan
        try {
            const { rows } = await sql`SELECT app_state FROM users WHERE id = ${user.id}`;
            if (rows.length === 0 || !rows[0].app_state) {
                return res.status(404).json({ message: 'No plan found for this user.' });
            }
            res.status(200).json(rows[0].app_state);
        } catch (error) {
            console.error('Failed to load plan:', error);
            res.status(500).json({ message: 'Failed to load plan.' });
        }
    } else if (req.method === 'POST') {
        // Save the user's plan
        try {
            const appState = req.body;
            // Basic validation
            if (!appState || typeof appState !== 'object') {
                 return res.status(400).json({ message: 'Invalid app state provided.' });
            }

            await sql`
                UPDATE users 
                SET app_state = ${JSON.stringify(appState)} 
                WHERE id = ${user.id}
            `;
            res.status(200).json({ message: 'Plan saved successfully.' });
        } catch (error) {
            console.error('Failed to save plan:', error);
            res.status(500).json({ message: 'Failed to save plan.' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}