"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyUs() {
  return (
    <>
      {/* Section 1 */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8 mb-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            scale: { type: "spring", duration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }} 
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/pana.png"
            width={600}
            height={600}
            alt="Learning Illustration"
            className="rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-3">
            Why choose Minimalistic Learning?
          </h2>
          <h3 className="text-3xl font-semibold text-blue-600 mb-4">
            Blogs for All Levels
          </h3>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-xl">
            From beginners to advanced learners, we offer blogs that cater to
            all skill levels.
          </p>
          {/* <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out font-semibold">
            Learn More
          </button> */}
        </div>
      </section>

      {/* Section 2 */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8 mb-16 bg-gray-50 rounded-lg">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-3">
            Learn at Your Own Pace
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-xl">
            Access content 24/7 and study whenever it fits into your schedule.
          </p>
          {/* <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out font-semibold">
            Learn More
          </button> */}
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            scale: { type: "spring", duration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }} 
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/pana (1).png"
            width={600}
            height={600}
            alt="Learn at Your Own Pace"
            className="rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </section>

      {/* Section 3 */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8 mb-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            scale: { type: "spring", duration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }} 
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/pana (2).png"
            width={600}
            height={600}
            alt="Certificates Illustration"
            className="rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-3">
            Earn Recognised Certificates
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-xl">
            Receive certificates that are widely recognised in the industry.
          </p>
          {/* <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out font-semibold">
            Learn More
          </button> */}
        </div>
      </section>

      {/* Section 4 */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8 mb-16 bg-gray-50 rounded-lg">
        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-3">
            Learn from Industry Experts
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-xl">
            Our instructors are seasoned professionals with years of experience
            in their fields.
          </p>
          {/* <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out font-semibold">
            Learn More
          </button> */}
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            scale: { type: "spring", duration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true, amount: 0.5 }} 
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/pana (3).png"
            width={600}
            height={600}
            alt="Experts Illustration"
            className="rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </section>
    </>
  );
}
