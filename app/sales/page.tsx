"use client"
import React, { useEffect, useState } from 'react';
import MainLayout from '../main.layout';
import axios from 'axios';


export default function Sales() {

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/product`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // const products = [
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    //     { name: 'สินค้า 1', price: '100 บาท', description: 'คำอธิบายสำหรับสินค้า 1', link: 'ข้อมูลติดต่อ', image: 'https://placehold.co/1280x720' },
    // ];



    return (
        <MainLayout>
            <div className="container mx-auto py-8 px-2">
                <h1 className="text-3xl font-bold mb-4">สินค้า</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={product.img} alt={product.name} className="w-full h-40 object-cover object-center" />
                            <div className="px-6 py-3">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                                <p className="text-lg font-semibold mb-2">ราคา: {product.price}</p>
                                <br />
                                <hr />
                                <p className="text-base text-center mt-3 text-gray-600 mb-2">ติดต่อ: {product.link}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </MainLayout>
    );
}
