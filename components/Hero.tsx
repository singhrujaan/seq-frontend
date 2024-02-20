"use client";

import Image from "next/image";
import { CustomButton } from ".";
import Carousel from "./Carousel";

// import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const images = [
    "https://via.placeholder.com/600x300/1abc9c",
    "https://via.placeholder.com/600x300/3498db",
    "https://via.placeholder.com/600x300/e74c3c",
  ];

  return (
    <div className="relative overflow-hidden lg:h-1/2 md:h-64 ">
      <div className="relative h-80 md:h-80  lg:h-screen pt-96">
        <Image src="/homeBackground.jpg" alt="Example Image" fill={true} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold text-gray-600">
            Experience the best Salon Service From us.
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            Beauty is not about enhancing
          </p>
          <button
            type="button"
            className="relative top-2 right-2 z-10 w-fit p-2 bg-purple-700 rounded-full "
            // onClick={closeModal}
          >
            Book your appointment now
          </button>
        </div>
      </div>
      <Carousel images={images} />
    </div>
  );
};

export default Hero;
