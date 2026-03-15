"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

type BlobAnimation = {
  x?: number[];
  y?: number[];
  scale?: number[];
  rotate?: number[];
};

type BlobConfig = {
  className: string;
  animation?: BlobAnimation;
  duration?: number;
};

type AnimatedBackgroundProps = {
  blobs: BlobConfig[];
  className?: string;
};

export function AnimatedBackground({
  blobs,
  className,
}: AnimatedBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          animate={{
            ...(blob.animation?.x && { x: blob.animation.x }),
            ...(blob.animation?.y && { y: blob.animation.y }),
            ...(blob.animation?.scale && { scale: blob.animation.scale }),
            ...(blob.animation?.rotate && { rotate: blob.animation.rotate }),
          }}
          transition={{
            duration: blob.duration ?? 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={blob.className}
        />
      ))}
    </div>
  );
}