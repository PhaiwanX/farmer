"use client"
import { useState } from 'react';
import { UserGroupIcon, ShieldCheckIcon, ShoppingBagIcon, ArrowLeftIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Sidebar({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const nav = {
        name: "หมู่บ้านวิทยาศาสตร์",
        items: [
            { href: '/admin', label: 'จัดการผู้ใช้', icon: ShieldCheckIcon },
            { href: '/admin/farmer', label: 'จัดการเกษตกร', icon: UserGroupIcon },
            { href: '/admin/product', label: 'จัดการสินค้า', icon: ShoppingBagIcon },
            { href: '/', label: 'กลับไปที่หน้าเว็บ', icon: ArrowLeftIcon },
        ]
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-900/80 text-white shadow-sm text-sm py-4">
                <div className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <a className="flex-none text-xl font-semibold" href="#">{nav.name}</a>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="p-2 text-white inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-500 bg-gray-800 text-gray-800 shadow-sm hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={toggleSidebar}
                            aria-label="Toggle navigation"
                        >
                            {isSidebarOpen ? (
                                <XIcon className="h-5 w-5" />
                            ) : (
                                <MenuIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </header> */}
            <div className="flex h-screen">
                <div className={`bg-gray-800 text-white w-16 md:w-64 space-y-6 py-7 px-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                    <nav>
                        {nav.items.map((item, index) => (
                            <Link href={item.href} key={index} className=" py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white flex items-center gap-x-2">
                                <item.icon className="h-5 w-5" />
                                <span className='hidden md:block' >{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 p-10 overflow-scroll">
                    {children}
                </div>
            </div>
        </>
    );
}
