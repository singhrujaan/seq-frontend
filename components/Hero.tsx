"use client";

import Image from "next/image";
import { CustomButton } from ".";
import Carousel from "./Carousel";
import { useEffect } from "react";

// import { CustomButton } from "@components";

const Hero = () => {
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = document.querySelector(".parallax-header");
      if (header) {
        // @ts-ignore
        header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const images = [
    "https://via.placeholder.com/600x300/1abc9c",
    "https://via.placeholder.com/600x300/3498db",
    "https://via.placeholder.com/600x300/e74c3c",
  ];

  return (
    <div className="relative overflow-hidden lg:h-1/2 md:h-64">
      {/* header */}
      <div className="header relative h-80 md:h-80 lg:h-screen parallax-header">
        <Image src="/homeBackground.jpg" alt="Example Image" fill={true} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-4xl font-bold text-gray-600">
            Experience the best Salon Service From us.
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            Beauty is not about enhancing
          </p>
          <button
            type="button"
            className="relative top-2 right-2 z-10 w-fit p-2 bg-purple-700 rounded-full"
          >
            Book your appointment now
          </button>
        </div>
      </div>
      {/* collage */}
      <div className="hidden lg:block relative w-full lg:h-screen  h-96 overflow-hidden">
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-1/2 z-30">
          <div className="flex flex-wrap justify-center">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-full sm:w-1/3">
                <img
                  src={`https://via.placeholder.com/500?text=Image${index + 1}`}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-auto"
                  style={{ margin: 0, padding: 0 }} // Ensure no default margin or padding
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Carousel */}
      <div className="mt-12 lg:mt-24 ">
        {/* Adjusted margin here */}
        <Carousel images={images} />
      </div>
    </div>
  );
};

export default Hero;
