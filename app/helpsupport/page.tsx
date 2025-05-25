// // "use client"; // ✅ This must be the first line

// // import React, { useState } from "react";
// // import Footer from "../components/Footer";
// // import Glance from "../components/Glance";

// // const faqs = [
// //   {
// //     question: "How do I reset my password?",
// //     answer: "Go to the login page and click on “Forgot Password”. Follow the instructions sent to your email."
// //   },
// //   {
// //     question: "How can I contact my instructor?",
// //     answer: "Use the in-app messaging system or the email provided on the course details page."
// //   },
// //   {
// //     question: "Where can I see my blogs?",
// //     answer: "Go to your dashboard and click on 'My Blogs' to view your published content."
// //   }
// // ];

// // const HelpSupportPage = () => {
// //   const [openIndex, setOpenIndex] = useState<number | null>(null);

// //   const toggleFAQ = (index: number) => {
// //     setOpenIndex(openIndex === index ? null : index);
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
// //       {/* Header */}
// //       <section className="text-center py-16 px-4">
// //         <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
// //           Help & Support
// //         </h1>
// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           We're here to help! Find answers to common questions or reach out to us directly.
// //         </p>
// //       </section>

// //       {/* FAQ Section */}
// //       <section className="max-w-5xl mx-auto px-6 py-10">
// //         <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
// //         <div className="space-y-6">
// //           {faqs.map((faq, index) => (
// //             <div key={index}>
// //               <button
// //                 onClick={() => toggleFAQ(index)}
// //                 className="w-full text-left font-semibold text-blue-600 focus:outline-none"
// //               >
// //                 {faq.question}
// //               </button>
// //               {openIndex === index && (
// //                 <p className="mt-2 text-sm text-gray-600 transition-all duration-300">{faq.answer}</p>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Contact Form */}
// //       <div className="bg-[#daf0ff] mt-12">
// //         <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
// //           Still Need Help?
// //         </h1>
// //         <p className="text-md text-gray-600 text-center mb-8">
// //           Fill out the form below and our team will get back to you shortly.
// //         </p>
// //         <Glance />
// //       </div>

// //       {/* Footer */}
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default HelpSupportPage;
// "use client"; // ✅ This must be the first line

// import React, { useState } from "react";
// import Footer from "../components/Footer";
// import Glance from "../components/Glance";

// const faqs = [
//   {
//     question: "How do I reset my password?",
//     answer: "Go to the login page and click on “Forgot Password”. Follow the instructions sent to your email."
//   },
//   {
//     question: "How can I contact my instructor?",
//     answer: "Use the in-app messaging system or the email provided on the course details page."
//   },
//   {
//     question: "Where can I see my blogs?",
//     answer: "Go to your dashboard and click on 'My Blogs' to view your published content."
//   }
// ];

// const HelpSupportPage = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
//       {/* Header */}
//       <section className="text-center py-16 px-4">
//         <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Help & Support
//         </h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           We're here to help! Find answers to common questions or reach out to us directly.
//         </p>
//       </section>

//       {/* FAQ Section */}
//       <section className="max-w-5xl mx-auto px-6 py-10">
//         <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
//         <div className="space-y-6">
//           {faqs.map((faq, index) => (
//             <div key={index}>
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="w-full text-left font-semibold text-blue-600 focus:outline-none"
//               >
//                 {faq.question}
//               </button>
//               {openIndex === index && (
//                 <p className="mt-2 text-sm text-gray-600 transition-all duration-300">{faq.answer}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Contact Form */}
//       <div className="bg-[#daf0ff] mt-12">
//         <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Still Need Help?
//         </h1>
//         <p className="text-md text-gray-600 text-center mb-8">
//           Fill out the form below and our team will get back to you shortly.
//         </p>
//         <Glance />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default HelpSupportPage;
"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import Glance from "../components/Glance";
import { ChevronDown } from "lucide-react"; // You need Lucide or Heroicons installed

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on “Forgot Password”. Follow the instructions sent to your email."
  },
  {
    question: "How can I contact my instructor?",
    answer: "Use the in-app messaging system or the email provided on the course details page."
  },
  {
    question: "Where can I see my blogs?",
    answer: "Go to your dashboard and click on 'My Blogs' to view your published content."
  }
];

const HelpSupportPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#daf0ff] text-gray-800 font-sans">
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Help & Support
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Find answers to common questions or reach out to us directly.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-md shadow p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left font-semibold text-blue-700 focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600 transition-all duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[#daf0ff] mt-12">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Still Need Help?
        </h1>
        <p className="text-md text-gray-600 text-center mb-8">
          Fill out the form below and our team will get back to you shortly.
        </p>
        <Glance />
      </div>

      <Footer />
    </div>
  );
};

export default HelpSupportPage;
