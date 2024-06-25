// app/recommendations/page.tsx
import React from 'react';
import MainLayout from '../main.layout';

const desertPlantImage = 'https://placehold.co/1280x720';

const crops = [
    {
        name: 'ถั่วฝักยาว',
        description: 'พืชที่เจริญเติบโตได้ดีในดินเค็มน้อย มีผลผลิตสูง',
        care: 'รักษาความชื้นและป้องกันการสะสมของเกลือที่ผิวดิน',
        image: desertPlantImage // รูปภาพสำหรับถั่วฝักยาว
    },
    {
        name: 'มะเขือ',
        description: 'พืชที่เจริญเติบโตได้ดีในดินเค็มน้อย มีการให้ผลผลิตที่ดี',
        care: 'รักษาความชื้นและป้องกันการสะสมของเกลือที่ผิวดิน',
        image: desertPlantImage // รูปภาพสำหรับมะเขือ
    },
    {
        name: 'ข้าวโพดหวาน',
        description: 'พืชที่เหมาะสมกับดินเค็มปานกลาง มีการเจริญเติบโตที่ดี',
        care: 'ใช้ระบบน้ำหยดเพื่อควบคุมความชื้นและเค็มของดิน',
        image: desertPlantImage // รูปภาพสำหรับข้าวโพดหวาน
    },
    {
        name: 'หน่อไม้ฝรั่ง',
        description: 'พืชที่ทนเค็มจัดและเจริญเติบโตได้ในดินเค็มจัด',
        care: 'ควรรักษาความชื้นในดินอย่างสม่ำเสมอ',
        image: desertPlantImage // รูปภาพสำหรับหน่อไม้ฝรั่ง
    },
];

const Recommendations: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto py-8 px-2">
                <h1 className="text-3xl font-bold mb-4">คำแนะนำการปลูกพืชสำหรับดินเค็ม</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {crops.map((crop, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover object-center" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{crop.name}</h2>
                                <p className="text-sm text-gray-600 mb-4">{crop.description}</p>
                                <p className="text-sm text-gray-600">การดูแล: {crop.care}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default Recommendations;
