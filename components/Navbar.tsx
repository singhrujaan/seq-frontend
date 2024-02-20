"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/constants";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 500); // Fix navbar after scrolling 50 pixels
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-black bg-opacity-30 md:bg-opacity-30"
          : "bg-transparent bg-opacity-30 md:bg-opacity-30"
      }`}
    >
      {!isScrolled ? (
        <div className="container flex items-center mt-2 justify-center ">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center ">
              {/* <img className="h-8 w-auto sm:h-10" src="/logo.svg" alt="Logo" /> */}
              LOGO here
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="#"
              className={` hover:text-teal-800 px-3 py-2 rounded-md text-md 
              text-[18px] font-bold ${
                isScrolled ? "text-white " : "text-gray-500"
              }
              `}
            >
              Phone number
            </a>
          </div>
          {/* Mobile Menu Button - Hamburger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              {isMobileMenuOpen ? (
                // <XIcon className="h-6 w-6" aria-hidden="true" />
                <span>E</span>
              ) : (
                <span>H</span>
                // <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <a
                href="#"
                className={`text-gray-500 hover:text-teal-800 px-3 py-2 rounded-md text-md  text-[16px] font-medium
                ${isScrolled ? "text-white " : "text-gray-500"}
                `}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* {navItems.map((item) => ( */}
            <CustomButton
              title="Sign in"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
            <CustomButton
              title="Register"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
            <h2>Cart</h2>
            {/* ))} */}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white fixed top-0 left-0 w-full h-full z-50`}
      >
        <div className="container flex items-center mt-2 justify-center ">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center ">
              {/* <img className="h-8 w-auto sm:h-10" src="/logo.svg" alt="Logo" /> */}
              LOGO here
            </a>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
            <a href="/" className="flex items-center">
              <img className="h-8 w-auto sm:h-10" src="/logo.svg" alt="Logo" />
            </a>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}E
            </button>
          </div>
          <div className="flex flex-col px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                href="#"
                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
