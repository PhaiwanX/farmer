// app/sales/page.tsx
const products = [
    { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', contact: 'ข้อมูลติดต่อ' },
    // เพิ่มข้อมูลสินค้าเพิ่มเติมตามต้องการ
];

export default function Sales() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">ช่องทางการจำหน่ายสินค้า</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index} className="mb-4">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="text-lg font-semibold">ราคา: {product.price}</p>
                        <p className="text-sm text-gray-600">ติดต่อ: {product.contact}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
