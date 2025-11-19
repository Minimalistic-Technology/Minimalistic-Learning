"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToggle";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blog" },
  { label: "Post New Blog", href: "/blog/createblogs" },
  { label: "Profile", href: "/AdminDashboard/user" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setUser(null);
      window.location.href = "/";
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

  if (pathname?.toLowerCase().startsWith("/admindashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl transition">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2563eb] to-sky-400 opacity-30 blur-lg" />
            <Image
              src="/images/logo.png"
              alt="Minimalistic Learning Logo"
              width={48}
              height={48}
              className="relative rounded-full ring-2 ring-white"
            />
          </div>
          <div className="hidden flex-col text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 sm:flex">
            <span className="text-xs tracking-[0.5em] text-slate-400">
              Minimalistic
            </span>
            <span className="text-xl tracking-[0.2em] text-slate-900">
              Learning
            </span>
          </div>
        </Link>

        <ul className="hidden items-center gap-4 rounded-full border border-slate-100 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-500 shadow-md md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-3 py-1 transition ${
                  pathname === link.href
                    ? "bg-[#2563eb]/10 text-[#2563eb]"
                    : "hover:text-[#2563eb]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 font-medium text-slate-600">
          <div className="hidden rounded-full border border-slate-100 bg-white/70 px-3 py-1 shadow-sm md:flex">
            <ThemeToggle />
          </div>
          {user ? (
            <div className="relative flex items-center gap-3" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-100 bg-white/80 px-3 py-1 text-[#2563eb] shadow-sm transition hover:-translate-y-0.5"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:inline">Hi, {user}</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                  <Link
                    href="/AdminDashboard/user"
                    className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-rose-500 transition hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Login
            </Link>
          )}
          <div className="md:hidden">
          <button
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
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
              <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-full w-72 space-y-6 border-l border-white/20 bg-white/90 p-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Menu
                    </span>
                    <button
                      className="rounded-full border border-slate-200 p-2 text-slate-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                  </div>
                  <ul className="space-y-3 text-sm font-semibold text-slate-600">
                    {navLinks.map((link) => (
                      <li key={`mobile-${link.href}`}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-2xl border border-slate-100 px-4 py-2 ${
                            pathname === link.href
                              ? "bg-[#2563eb]/10 text-[#2563eb]"
                              : "hover:bg-slate-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-2">
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          Theme
                        </span>
                        <ThemeToggle />
                      </div>
                    </li>
                    {user ? (
                      <>
                        <li className="text-[#2563eb]">Hi, {user}</li>
                        <li>
                          <Link
                            href="/AdminDashboard/user"
                            onClick={() => setIsOpen(false)}
                            className="block w-full rounded-2xl border border-slate-100 px-4 py-2 text-left text-slate-600 hover:bg-slate-50"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full rounded-2xl border border-rose-100 px-4 py-2 text-left text-rose-600 hover:bg-rose-50"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          href="/auth/login"
                          onClick={() => setIsOpen(false)}
                          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-2 font-semibold text-white shadow-sm"
                        >
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
