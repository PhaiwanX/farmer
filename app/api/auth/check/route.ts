import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const auth = cookies().get('auth');

        if (!auth?.value) {
            return Response.json({ msg: 'notLoggedin' }, { status: 200 });
        }

        const { userId, username } = JSON.parse(auth.value);

        return Response.json({ msg: 'isLoggedin', userId, username }, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: 'Failed to check session', msg: error.message }, { status: 500 });
    }
}
