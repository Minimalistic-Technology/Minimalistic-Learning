"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
    <section ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The passionate individuals behind Minimalistic Learning
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              className="group text-center"
            >
              <div className="relative mb-4 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-square w-full max-w-[120px] mx-auto">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
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



