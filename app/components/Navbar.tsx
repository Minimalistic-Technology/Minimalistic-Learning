"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, BookOpen, Sparkles, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      setShowMenu(false);
      router.push("/");
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.toLowerCase().startsWith("/admindashboard") || 
      pathname?.toLowerCase().startsWith("/auth")) {
    return null;
  }

  const displayName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.email?.split('@')[0] || 'User';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-purple-500/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group relative"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-2.5 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BookOpen className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-indigo-500 group-hover:to-pink-500 transition-all duration-300">
                Minimalistic Learning
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Learn. Create. Grow.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/30 z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="hidden md:flex">
              <div className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ThemeToggle />
              </div>
            </div>

            {/* User Menu / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
                    >
                      <div className="px-4 py-4 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-purple-50/50 via-indigo-50/50 to-pink-50/50 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-pink-900/10">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                          {displayName}
                        </p>
                        {user.email && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                            {user.email}
                          </p>
                        )}
                      </div>
                      <div className="py-2">
                        <Link
                          href="/AdminDashboard/user"
                          onClick={() => setShowMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                        >
                          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 left-0 right-0 bottom-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-lg shadow-purple-500/30"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50/50 via-indigo-50/50 to-pink-50/50 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-pink-900/10">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{displayName}</p>
                        {user.email && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user.email}</p>
                        )}
                      </div>
                      <Link
                        href="/AdminDashboard/user"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Settings className="w-5 h-5" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-semibold text-white text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-lg shadow-purple-500/30"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
