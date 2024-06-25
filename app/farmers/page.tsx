// app/farmers/page.tsx
import Link from 'next/link';

const farmers = [
    { id: 1, name: 'เกษตรกร 1', location: 'ที่ตั้ง 1', coordinates: 'พิกัด 1', area: '10 ไร่' },
    // เพิ่มข้อมูลเกษตรกรเพิ่มเติมตามต้องการ
];

export default function Farmers() {
    return (
        <div className="container mx-auto py-8 px-2">
            <h1 className="text-3xl font-bold mb-4">ข้อมูลเกษตรกร</h1>
            <ul>
                {farmers.map(farmer => (
                    <li key={farmer.id} className="mb-2">
                        <Link href={`/farmers/${farmer.id}`} className="text-blue-500 hover:underline">
                            {farmer.name}
                        </Link> - {farmer.location} - {farmer.area}
                    </li>
                ))}
            </ul>
        </div>
    );
}
