"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
  ref={containerRef}
  className={cn(
    "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
    className
  )}
>
  <ul
    ref={scrollerRef}
    className={cn(
      "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
      start && "animate-scroll",
      pauseOnHover && "hover:[animation-play-state:paused]"
    )}
  >
    {items.map((item) => (
      <li
        key={item.name}
        className="w-[350px] md:w-[450px] flex-shrink-0 rounded-3xl border border-blue-600 border-opacity-50 px-8 py-8
          bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900
          shadow-lg hover:shadow-2xl transition-shadow duration-300
          hover:scale-[1.04] transform-gpu cursor-pointer"
        style={{
          boxShadow:
            "inset 0 0 10px rgb(59 130 246 / 0.6), 0 8px 20px rgb(14 165 233 / 0.3)",
        }}
      >
        <blockquote>
          <span className="relative z-20 block text-sm leading-relaxed text-white font-light drop-shadow-md">
            {item.quote}
          </span>
          <div className="relative z-20 mt-8 flex items-center gap-4">
            {/* Optional: avatar image if you want */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white drop-shadow-sm">
                {item.name}
              </span>
              <span className="text-md font-medium text-blue-200 drop-shadow-sm">
                {item.title}
              </span>
            </div>
          </div>
        </blockquote>
      </li>
    ))}
  </ul>
</div>

  );
};
