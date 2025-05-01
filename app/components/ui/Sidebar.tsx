
// components/ui/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart2, 
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  href, 
  active 
}) => {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
        active ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
      }`}>
        <div className="w-6 h-6">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: <Users size={20} />,
      label: 'User Management',
      href: '/user-management',
    },
    {
      icon: <CreditCard size={20} />,
      label: 'Payment & Subscription management',
      href: '/payments',
    },
    {
      icon: <BarChart2 size={20} />,
      label: 'Reports',
      href: '/reports',
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      href: '/settings',
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full bg-white px-3 py-6">
      <div>
        <div className="px-3 mb-8">
          <h1 className="text-blue-500 text-xl font-medium">Minimalistic Learning</h1>
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <button className="flex items-center gap-2 text-rose-500 px-3 py-2 w-full">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
