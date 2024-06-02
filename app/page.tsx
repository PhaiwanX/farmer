"use client"
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UsersIcon, ChatAlt2Icon, ShoppingBagIcon, PhoneIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

const navItems = [
  { href: '/', label: 'หน้าหลัก', icon: HomeIcon },
  { href: '/farmers', label: 'ข้อมูลเกษตรกร', icon: UsersIcon },
  { href: '/recommendations', label: 'คำแนะนำการปลูกพืช', icon: ChatAlt2Icon },
  { href: '/sales', label: 'ช่องทางการจำหน่ายสินค้า', icon: ShoppingBagIcon },
  { href: '/contact', label: 'ติดต่อเรา', icon: PhoneIcon },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">ระบบข้อมูลเกษตรกร</h1>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <XIcon className="w-6 h-6 text-gray-800" /> : <MenuIcon className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
          <nav className={`fixed inset-0 bg-gray-100 flex flex-col items-center space-y-4 md:space-y-0 justify-center transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:static md:flex md:flex-row md:gap-4 md:bg-transparent md:translate-x-0`}>
            {navItems.map((item) => (

              <Link key={item.href} href={item.href} className="text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center">
                {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                <span>{item.label}</span>
              </Link>

            ))}
          </nav>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center pt-16">
        <section className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
          <p className="text-center text-gray-700 text-lg">เรียนรู้เพิ่มเติมเกี่ยวกับโครงการของเราและวิธีที่เราช่วยเหลือเกษตรกรในพื้นที่ดินเค็ม</p>
        </section>
      </main>
    </div>
  );
}
