"use client";
import { useState, useEffect } from 'react';
import MainLayout from '../main.layout';
import Image from 'next/image';

const Home = () => {

  const images = [
    "/image/image1.jpg",
    "/image/image2.jpg",
    "/image/image3.jpg",
    "/image/image4.jpg",
    "/image/image5.jpg",
    "/image/image6.jpg",
    "/image/image7.jpg"
  ];

  
  return (
    <MainLayout>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-5">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Gallery</h2>

            <p className="hidden max-w-screen-sm text-gray-500 md:block">
              รวมรูปกิจกรรมชุมชน
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          {images.map((item, index) => (
            <div key={index}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
              <img src={item} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
              </div>
            </div>
          ))}

        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
