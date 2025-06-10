"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
 const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {});

      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setUser(null);

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-gray-700 font-medium items-center">
          {[
            { label: "Home", href: "/#" },
            { label: "About", href: "/aboutus" },
            { label: "Blog's", href: "/blog" },
            { label: "Post New Blog", href: "/blog/createblogs" },
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

        {/* Auth Buttons */}
        <div className="flex flex-row md:flex-row space-y-3 md:space-y-0 md:space-x-6 items-center justify-center font-sans">
          {user ? (
            <div className="relative flex flex-row gap-3 text-left group">

              {/* Profile Icon */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Profile Menu"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-3xl focus:outline-none"
              >
                <FaUserCircle />
              </button>
               <span className="text-blue-600 font-medium mr-2">Hi, {user}</span>
              {/* Dropdown menu */}
              {showMenu && (
                <div
                  onMouseEnter={() => setShowMenu(true)}
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute right-0 mt-6 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <ul className="py-1 text-gray-700">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/components/signup"
                className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:text-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Sign up"
              >
                Sign up
              </a>
              <a
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Log in"
              >
                Log in
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden z-10">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger Icon */}
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

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="fixed top-0 left-0 h-[90%] w-full bg-white p-4 shadow-md overflow-x-hidden">
              <div className="flex items-center text-blue-600 font-semibold text-lg md:text-xl pb-2">
                <img src="/images/ml.jpg" alt="Logo" className="h-8 mr-2" />
                <span className="tracking-wider">MINIMALISTIC LEARNING</span>
              </div>
              <button
                className="absolute top-4 right-4 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {/* Close Icon */}
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
              <ul className="space-y-4 text-gray-700 font-medium mt-4">
                <li>
                  <a href="/" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-blue-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-blue-600">
                    Blog's
                  </a>
                </li>
                <li>
                  <a href="/contactus" className="hover:text-blue-600">
                    Contact Us
                  </a>
                </li>
                {user ? (
                  <>
                    <li className="text-blue-600">Hi, {user}</li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:underline"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a
                        href="/components/signup"
                        className="hover:text-blue-600"
                      >
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a href="/login" className="hover:text-blue-600">
                        Login
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
