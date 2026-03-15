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
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-blue-500/5' 
          : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group relative"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 p-2 sm:p-2.5 shadow-lg shadow-blue-500/30">
              <BookOpen className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-sky-500 group-hover:to-cyan-500 transition-all duration-300">
                <span className="hidden sm:inline">Minimalistic Learning</span>
                <span className="sm:hidden">ML</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Learn. Create. Grow.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 md:gap-2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30 z-0"
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <div className="hidden md:flex items-center">
              <div className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ThemeToggle />
              </div>
            </div>

            {/* User Menu / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative flex items-center" ref={menuRef}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="hidden lg:inline max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
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
                      <div className="px-4 py-4 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 via-sky-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:via-sky-900/10 dark:to-cyan-900/10">
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
                className="flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
              className="fixed top-16 sm:top-18 md:top-20 left-0 right-0 bottom-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 lg:hidden overflow-y-auto"
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
                          ? "text-white bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 shadow-lg shadow-blue-500/30"
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
                      <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50/50 via-sky-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:via-sky-900/10 dark:to-cyan-900/10">
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
                      className="block px-4 py-3 rounded-xl text-base font-semibold text-white text-center bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 shadow-lg shadow-blue-500/30"
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
