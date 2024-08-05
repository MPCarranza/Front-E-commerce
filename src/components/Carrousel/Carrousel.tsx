"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const Carrousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["/1.svg", "/2.svg", "/3.svg", "/4.svg"];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full">
      <div className="relative h-96 sm:h-80 md:h-96 lg:h-112 xl:h-128 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              priority
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-3 sm:left-4 lg:left-6 bg-gray-900 text-white rounded-full p-2 sm:p-3 lg:p-4"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-3 sm:right-4 lg:right-6 bg-gray-900 text-white rounded-full p-2 sm:p-3 lg:p-4"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carrousel;
