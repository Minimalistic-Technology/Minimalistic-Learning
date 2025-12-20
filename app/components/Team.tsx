"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Users, Sparkles } from "lucide-react";
import { useRef } from "react";

const teamMembers = [
  {
    name: "Harsh",
    role: "Founder & CEO",
    image: "/images/harsh.jpg",
  },
  {
    name: "Mahesh",
    role: "CTO",
    image: "/images/mahesh.jpeg",
  },
  {
    name: "Manan",
    role: "Lead Developer",
    image: "/images/manan.jpeg",
  },
  {
    name: "Manikanta",
    role: "Design Lead",
    image: "/images/manikanta.jpg",
  },
  {
    name: "Sadashiv",
    role: "Product Manager",
    image: "/images/Sadashiv.jpeg",
  },
  {
    name: "Sandip",
    role: "Content Strategist",
    image: "/images/sandip.jpeg",
  },
  {
    name: "Sumit",
    role: "Marketing Head",
    image: "/images/Sumitborate.jpeg",
  },
  {
    name: "Sunny",
    role: "Community Manager",
    image: "/images/sunny.jpeg",
  },
  {
    name: "Tushar",
    role: "Developer",
    image: "/images/tushar.png",
  },
  {
    name: "Varshini",
    role: "UX Designer",
    image: "/images/Varshini.jpeg",
  },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200/50 dark:ring-blue-700/50 shadow-lg mb-6"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Our Team</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            The passionate individuals behind Minimalistic Learning
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group text-center p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 aspect-square w-full max-w-[100px] sm:max-w-[120px] mx-auto ring-4 ring-blue-200/50 dark:ring-blue-800/50 group-hover:ring-blue-400/50 dark:group-hover:ring-blue-600/50 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-[#2563eb] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;



