import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

type BadgeProps = {
  title: string;
  shortTitle?: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "purple" | "orange";
  pulse?: boolean;
  delay?: number;
  className?: string;
};

const colorStyles = {
  blue: "text-blue-600 ring-blue-200 dark:ring-blue-700",
  green: "text-green-600 ring-green-200 dark:ring-green-700",
  purple: "text-purple-600 ring-purple-200 dark:ring-purple-700",
  orange: "text-orange-600 ring-orange-200 dark:ring-orange-700",
};

export const Badge = ({
  title,
  shortTitle,
  icon,
  color = "blue",
  pulse = true,
  delay = 0,
  className,
}: BadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
        "px-3 py-1.5 sm:px-4 sm:py-2",
        "text-xs sm:text-sm font-semibold",
        "ring-1 shadow-lg",
        colorStyles[color],
        className
      )}
    >
      {pulse && (
        <span className="flex h-2 w-2 rounded-full bg-current animate-pulse" />
      )}

      <span className="hidden sm:inline">{title}</span>

      {shortTitle && <span className="sm:hidden">{shortTitle}</span>}

      {icon}
    </motion.div>
  );
};