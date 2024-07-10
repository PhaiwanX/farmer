import type { Metadata } from "next";
import Sidebar from '@/components/admin/Sidebar'
import { useEffect, useState } from "react";
import Login from '@/app/admin/login/page'
type Session = {
    msg: string;
    userId?: string;
    username?: string;
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [session, setSession] = useState<Session>({ msg: 'loading' });

    useEffect(() => {
        async function checkSession() {
            const response = await fetch('/api/auth/check');
            const data = await response.json();
            setSession(data);
        }
        checkSession();
    }, []);

    if (session.msg == "isLoggedin") {
        return (
            <Sidebar>
                {children}
            </Sidebar>
        );
    } else if (session.msg == 'notLoggedin') {
        return (
            <>
                <Login />   
            </>
        )
    }
}
