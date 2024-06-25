import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";
import PrelineScript from "@/components/PrelineScript";
import Navbar from "@/components/Navbar"
const mitr = Mitr({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: 'หมู่บ้านวิทยาศาสตร์ "ข้าวมันปู วิถีใหม่ ใส่ใจสิ่งแวดล้อม"',
  description: 'หมู่บ้านวิทยาศาสตร์ "ข้าวมันปู วิถีใหม่ ใส่ใจสิ่งแวดล้อม"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mitr.className} bg-gray-50`}>
        {children}
      </body>
      <PrelineScript />
    </html>
  );
}
