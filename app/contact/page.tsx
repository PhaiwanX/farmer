// app/contact/page.tsx
export default function Contact() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">ติดต่อเรา</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
                    <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                    <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ข้อความ</label>
                    <textarea className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">ส่งข้อความ</button>
            </form>
        </div>
    );
}
