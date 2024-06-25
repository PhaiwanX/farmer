import knex from '@/lib/knex';

export async function GET() {
    try {
        const users = await knex('user').select('*');
        return Response.json(users, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, group, role } = await req.json();

        if (!name || !group || !role) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await knex('user').where({ name }).first();
        if (existingUser) {
            return Response.json({ error: 'Username already exists' }, { status: 400 });
        }

        await knex('user').insert({ name, group, role });
        return Response.json({ message: 'User created' }, { status: 201 });
    } catch (error) {
        return Response.json({ error: 'Failed to create user', msg: error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { uid, name, group, role } = await req.json();

        if (!uid || !name || !group || !role) {
            return Response.json({ error: 'Missing required fields: uid, name, group, role' }, { status: 400 });
        }

        await knex('user').where({ uid }).update({ name, group, role });
        return Response.json({ message: 'User updated' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { uid } = await req.json();
        if (!uid) {
            return Response.json({ error: 'Missing required fields: uid' }, { status: 400 });
        }
        await knex('user').where({ uid }).del();
        return Response.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
