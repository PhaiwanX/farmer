// app/recommendations/page.tsx
const crops = [
    { name: 'พืช 1', description: 'คำอธิบายสำหรับพืช 1', care: 'วิธีการดูแลสำหรับพืช 1' },
    // เพิ่มข้อมูลพืชเพิ่มเติมตามต้องการ
];

export default function Recommendations() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">คำแนะนำการปลูกพืช</h1>
            <ul>
                {crops.map((crop, index) => (
                    <li key={index} className="mb-4">
                        <h2 className="text-2xl font-bold">{crop.name}</h2>
                        <p>{crop.description}</p>
                        <p className="text-sm text-gray-600">การดูแล: {crop.care}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
