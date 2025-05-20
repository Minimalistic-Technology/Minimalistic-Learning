"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-transparent py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center text-blue-600 font-semibold text-lg md:text-xl cursor-pointer">
            <Image
              src="/images/logo.png"
              alt="Minimalistic Learning Logo"
              width={46}
              height={46}
              className="rounded-full mr-3"
            />
            <span>MINIMALISTIC LEARNING </span>
          </div>
        </Link>
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-gray-700 font-medium items-center">
          {[
            { label: "Home", href: "/#" },
            { label: "About", href: "/aboutus" },
            { label: "Blog's", href: "/blog" },
            { label: "Post New Blog", href: "/blog/createblog's" },
          ].map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="relative group transition duration-300 text-gray-700 hover:text-blue-600"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 items-center font-sans">
          <a
            href="/components/signup"
            className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:text-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 active:text-blue-900"
            aria-label="Sign up"
          >
            Sign up
          </a>
          <a
            href="/logIn"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 active:bg-blue-800 flex items-center justify-center whitespace-nowrap"
            aria-label="Log in"
          >
            Log in
          </a>
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden z-10">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger Menu Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isOpen && (
            //<div className="fixed top-0 left-0 h-full w-full bg-white p-4 shadow-md overflow-x-hidden overflow-y-scroll" style={{ height: '100vh', overflowY: 'scroll' }}></div>
            <div className="fixed top-0 left-0 h-[90%] w-full bg-white p-4 shadow-md overflow-x-hidden">
              <div className="flex items-center text-blue-600 font-semibold text-lg md:text-xl pb-2">
                <img
                  src="/images/ml.jpg"
                  alt="Minimalistic Learning Logo"
                  className="h-8 mr-2"
                />
                <span className="tracking-wider">MINIMALISTIC LEARNING</span>
              </div>
              <button
                className="absolute top-4 right-4 text-gray-700 focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                {/* Close Button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="space-y-4 text-gray-700 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/aboutus"
                    className="hover:text-blue-600 transition duration-300"
                  >
                    About
                  </a>
                </li>
                {/* <li>
                  <a
                    href="/courses"
                    className="hover:text-blue-600 transition duration-300"
                  >
                    Courses
                  </a>
                </li> */}
                <li>
                  <a
                    href="/blog"
                    className="hover:text-blue-600 transition duration-300"
                  >
                    Blog's
                  </a>
                </li>
                <li>
                  <a
                    href="/contactus"
                    className="hover:text-blue-600 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
