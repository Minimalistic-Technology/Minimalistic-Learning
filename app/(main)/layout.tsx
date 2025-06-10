"use client";
import React from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("../components/ui/Sidebar"), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <div className="w-64 h-full border-r">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto py-16">{children}</div>
    </div>
  );
}
