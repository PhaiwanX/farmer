import knex from '@/lib/knex';
import { cookies } from 'next/headers';

export async function POST(req:Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const user = await knex('user').where({ name : username }).first();

        if (!user || user.password != password) {
            return Response.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        cookies().set('auth', JSON.stringify({ userId: user.uid, username: user.name }));

        return Response.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to login', msg: error }, { status: 500 });
    }
}
