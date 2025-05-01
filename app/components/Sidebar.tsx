'use client';{/*started by sunny */}

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen, Users, FileText, CreditCard, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/studentdashboard' },
    { icon: BookOpen, label: 'My Courses', href: '/studentdashboard/courses' },
    { icon: Users, label: 'Tutor Selection', href: '/studentdashboard/tutors' },
    { icon: FileText, label: 'Assignments & Quizzes', href: '/studentdashboard/assignments' },
    { icon: CreditCard, label: 'Payments', href: '/studentdashboard/payments' },
    { icon: Settings, label: 'Settings', href: '/studentdashboard/settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white z-40 px-4 flex items-center border-b">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-r border-gray-200 h-screen
        fixed lg:sticky top-0 left-0
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-50 lg:z-0
      `}>
        <div className="flex flex-col h-full pt-6 lg:pt-6">
          <div className="px-6 mb-8">
            <h1 className="text-lg font-bold text-indigo-500">Minimalistic Learning</h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg mx-3 transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:text-indigo-500'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : ''}`} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-3 mt-auto pb-6">
            <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full">
              <LogOut className="w-[18px] h-[18px] text-red-600" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
{/*ended by sunny*/}