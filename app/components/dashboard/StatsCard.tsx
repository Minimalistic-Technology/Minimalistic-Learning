'use client';{/*started by sunny*/}

import { GraduationCap, BookOpen, CheckCircle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
  type: 'total' | 'ongoing' | 'completed';
}

export function StatsCard({ title, value, bgColor, iconColor, type }: StatsCardProps) {
  const Icon = {
    total: GraduationCap,
    ongoing: BookOpen,
    completed: CheckCircle
  }[type];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${bgColor} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{value}</h3>
          <span className="text-gray-600 text-sm">{title}</span>
        </div>
      </div>
    </div>
  );
}{/*ended by sunny */}