import type { Metadata } from "next";
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}
