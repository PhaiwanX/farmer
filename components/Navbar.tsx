import { HomeIcon, PhotoIcon, ChatBubbleBottomCenterIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
export default function Navbar() {
    const nav = {
        name: "หมู่บ้านวิทยาศาสตร์",
        items: [
            { href: '/', label: 'หน้าหลัก', icon: HomeIcon },
            { href: '/gallery', label: 'แกลลอรี่', icon: PhotoIcon },
            { href: '/recommendations', label: 'คำแนะนำการปลูกพืช', icon: ChatBubbleBottomCenterIcon },
            { href: '/sales', label: 'ช่องทางการจำหน่ายสินค้า', icon: ShoppingBagIcon },
        ]
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
