"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Blogs", href: "/blog", icon: "📝" },
  { label: "Post New Blog", href: "/blog/createblogs", icon: "✍️" },
  { label: "Profile", href: "/AdminDashboard/user", icon: "👤" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      // Clear all auth-related data
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      setShowMenu(false);
      router.push("/");
      // Force a page reload to clear any cached state
      window.location.reload();
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

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Hide navbar on auth pages
  if (pathname?.toLowerCase().startsWith("/admindashboard") || 
      pathname?.toLowerCase().startsWith("/auth")) {
    return null;
  }

  const displayName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.email?.split('@')[0] || 'User';

  return (
    <nav 
      className={`sticky top-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border transition-all duration-300 px-4 py-3 ${
        isScrolled 
          ? 'border-white/80 bg-white/95 backdrop-blur-xl shadow-xl' 
          : 'border-white/50 bg-white/80 backdrop-blur-xl shadow-lg'
      }`}>
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-30 blur-lg group-hover:opacity-40 transition-opacity" />
            <Image
              src="/images/logo.png"
              alt="Minimalistic Learning Logo"
              width={48}
              height={48}
              className="relative rounded-full ring-2 ring-white transition-transform group-hover:ring-blue-200"
            />
          </div>
          <div className="hidden flex-col text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 sm:flex">
            <span className="text-xs tracking-[0.5em] text-slate-400 group-hover:text-slate-500 transition-colors">
              Minimalistic
            </span>
            <span className="text-xl tracking-[0.2em] text-slate-900 group-hover:text-blue-600 transition-colors">
              Learning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-2 rounded-full border border-slate-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-md md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 font-medium text-slate-600">
          {/* Theme Toggle */}
          <div className="hidden rounded-full border border-slate-100 bg-white/70 px-3 py-1.5 shadow-sm md:flex transition-transform hover:scale-110">
            <ThemeToggle />
          </div>

          {/* User Menu / Login Button */}
          {isAuthenticated && user ? (
            <div className="relative z-[99] flex items-center gap-3" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="relative z-[99] flex items-center gap-2 rounded-full border border-slate-100 bg-white/80 px-3 py-1.5 text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-blue-50"
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden sm:inline font-semibold">
                  {displayName}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-14 z-[100] w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl transition-all duration-200 opacity-100 translate-y-0">
                  <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <p className="text-sm font-semibold text-slate-900">
                      {displayName}
                    </p>
                    {user.email && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <div className="py-1">
                    <Link
                      href="/AdminDashboard/user"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:scale-110 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
                  onClick={() => setIsOpen(false)}
                />
                <div className="fixed right-0 top-0 z-50 h-full w-80 space-y-6 border-l border-white/20 bg-white/95 backdrop-blur-xl p-6 shadow-2xl transition-transform duration-300 transform translate-x-0">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm font-bold text-slate-900">
                        Menu
                      </span>
                    </div>
                    <button
                      className="rounded-full border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <ul className="space-y-2 text-sm font-semibold text-slate-600">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={`mobile-${link.href}`}>
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ${
                              isActive
                                ? "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                                : "border-slate-100 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                  </div>

                  {isAuthenticated && user ? (
                    <div className="border-t border-slate-200 pt-4 space-y-2">
                      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
                        <p className="text-sm font-semibold text-blue-900">
                          {displayName}
                        </p>
                        {user.email && (
                          <p className="text-xs text-blue-600 mt-0.5">
                            {user.email}
                          </p>
                        )}
                      </div>
                      <Link
                        href="/AdminDashboard/user"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl border border-rose-100 bg-white px-4 py-3 text-left text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-slate-200 pt-4">
                      <Link
                        href="/auth/login"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
