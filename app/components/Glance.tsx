"use client";
import React, { useRef } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null); // Type-safe form reference

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_m4h2dnz",
        "template_nauzl7c",
        form.current,
        "YHXLwowzT-h_CzgiH"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current?.reset(); // Optional chaining to safely reset
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <section className="bg-[#daf0ff] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Title, Description, and Social Media */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Contact Us Today
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Have Questions? Your Learning Journey Starts Here! <br />
            Connect with Us for Support, Feedback, or Assistance.
          </p>
          <a
            href="mailto:minimalisticlearning2024@gmail.com"
            className="text-blue-600 hover:underline mb-4"
          >
            minimalisticlearning2024@gmail.com
          </a>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {/* Facebook Icon (Commented Out)
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
            </a> */}
            <a
              href="https://x.com/Minimal_Learn"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.8.4-1.7.7-2.6.8a4.5 4.5 0 001.9-2.5c-.9.5-1.9.9-3 1.1A4.5 4.5 0 0016.5 4c-2.5 0-4.5 2-4.5 4.5 0 .3 0 .6.1.9a12.9 12.9 0 01-9.4-4.8c-.3.5-.5 1.2-.5 1.8 0 1.6.8 3 2 3.8-.7 0-1.3-.2-1.9-.5v.1c0 2.2 1.6 4 3.7 4.4a4.5 4.5 0 01-1.2.2c-.3 0-.6 0-.8-.1.6 2 2.4 3.5 4.5 3.6a9 9 0 01-6.6 1.8A12.7 12.7 0 007.5 20c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.7-1.5 2.3-2.6z" />
              </svg>
            </a>
            {/* YouTube Icon (Commented Out)
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <svg ...></svg>
            </a> */}
            {/* Instagram Icon (Commented Out)
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <svg ...></svg>
            </a> */}
            <a
              href="https://www.linkedin.com/company/minimalisticlearning/"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8.98h4v12H3v-12zM9.5 8.98H13v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.3v6.9h-4v-6.1c0-1.5 0-3.5-2.2-3.5s-2.6 1.7-2.6 3.4v6.2h-4v-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-4"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Name *"
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {/* Blog title input (Commented Out)
          <input
            type="Message"
            placeholder="Blog title *"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          /> */}
          <textarea
            name="message"
            placeholder="Message *"
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Send Us a Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
