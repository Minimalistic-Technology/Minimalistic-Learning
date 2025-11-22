"use client";
import { motion, useScroll } from "framer-motion";
import React from "react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "rgb(37, 99, 235)",
        transformOrigin: "0%",
        zIndex: 9999,
        scaleX: scrollYProgress,
      }}
    />
  );
}
