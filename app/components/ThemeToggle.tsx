"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only render contents after mounting to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder with same dimensions
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
        {theme === "light" ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
