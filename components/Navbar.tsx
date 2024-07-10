"use client"
import { useState } from 'react';
import { HomeIcon, PhotoIcon, ChatBubbleBottomCenterIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const nav = {
        name: "หมู่บ้านวิทยาศาสตร์",
        items: [
            { href: '/recommendations', label: 'คำแนะนำการปลูกพืช', icon: ChatBubbleBottomCenterIcon },
            { href: '/sales', label: 'ช่องทางการจำหน่ายสินค้า', icon: ShoppingBagIcon },
            { href: '/gallery', label: 'ภาพกิจกรรม', icon: PhotoIcon },
            { href: '/search', label: 'ติดต่อเรา', icon: QuestionMarkCircleIcon },
        ],
        dropdown: {
            label: 'หน้าแรก',
            icon: HomeIcon,
            items: [
                { href: '/', label: 'ไปหน้าหลัก' },
                { href: '/', label: 'สภาพทั่วไปของดินเค็ม' },
                { href: '/analyze', label: 'การสำรวจ การเก็บตัวอย่างดิน การวิเคราะห์ดิน' },
                { href: '/manage', label: 'การจัดการเชิงพื้นที่ดินเค็ม' },
                { href: '/tools', label: 'วัสดุปรับปรุงและฟื้นฟูดินเค็ม' },
            ]
        }
    };


    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white shadow-sm text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between">
                    <a className="flex-none text-xl font-semibold" href="#">{nav.name}</a>
                    <div className="sm:hidden">
                        <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-with-collapse" aria-controls="navbar-with-collapse" aria-label="Toggle navigation">
                            <Bars3Icon className="hs-collapse-open:hidden flex-shrink-0 size-4" />
                            <XMarkIcon className="hs-collapse-open:block hidden flex-shrink-0 size-4" />
                        </button>
                    </div>
                </div>
                <div id="navbar-with-collapse" className="hidden transition-all duration-[0.1ms] overflow-hidden basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">

                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center font-medium text-gray-600 hover:text-gray-400">
                                <nav.dropdown.icon className="h-5 w-5 mr-2" aria-hidden="true" />   
                                {nav.dropdown.label}
                            </button>
                            {dropdownOpen && (
                                <div className="relative md:fixed mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                                    {nav.dropdown.items.map((dropdownItem) => (
                                        <Link key={dropdownItem.label} className="block px-4 py-2 text-gray-600 hover:bg-gray-100" href={dropdownItem.href}>
                                            {dropdownItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {nav.items.map((item) => (
                            <Link key={item.label} className="flex items-center font-medium text-gray-600 hover:text-gray-400" href={item.href}>
                                <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
