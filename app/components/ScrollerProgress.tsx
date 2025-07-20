"use client";
import { motion, useScroll } from "framer-motion";
import React from "react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll(); // Returns a value between 0 and 1

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        background: "blue",
        transformOrigin: "0%",  // start from left
        zIndex: 9999,
        scaleX: scrollYProgress, // animate the width with scroll progress
      }}
    />
  );
}
