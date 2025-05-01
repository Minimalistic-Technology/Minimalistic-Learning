import React from "react";
import Footer from "./Footer";
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
const ContactUs: React.FC = () => {
  return (
    <div className="bg-[#daf0ff] min-h-screen">
      {/* Contact Us Header Section */}
          <div className="w-full bg-[#daf0ff] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Side - Contact Info */}
            <div className="flex-1 flex flex-col items-center text-center">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Contact Us Today</h2>
              <p className="text-black mb-6 max-w-sm">
                Have Questions? Your learning journey starts here! <br />
                Connect with us for support, feedback, or assistance.
              </p>
              <div className="flex gap-6 mt-4">
                <a href="https://www.facebook.com/" className="bg-[#daf0ff] p-3 rounded-full hover:bg-blue-200 transition">
                  <FaFacebookF size={22} className="text-blue-600" />
                </a>
                <a href="https://x.com/" className="bg-[#daf0ff] p-3 rounded-full hover:bg-blue-200 transition">
                  <FaTwitter size={22} className="text-blue-600" />
                </a>
                <a href="https://www.youtube.com/" className="bg-[#daf0ff] p-3 rounded-full hover:bg-blue-200 transition">
                  <FaYoutube size={22} className="text-blue-600" />
                </a>
              </div>
            </div>
      
            {/* Right Side - Contact Form (Minimal, Blended) */}
            <div className="flex-1 space-y-4 w-full max-w-md">
              <input
                type="text"
                placeholder="Name *"
                className="w-full p-3 bg-transparent border border-blue-400 rounded-lg placeholder-gray-600 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full p-3 bg-transparent border border-blue-400 rounded-lg placeholder-gray-600 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full p-3 bg-transparent border border-blue-400 rounded-lg placeholder-gray-600 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <textarea
                placeholder="Message *"
                className="w-full p-3 bg-transparent border border-blue-400 rounded-lg placeholder-gray-600 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Send Us a Message
              </button>
            </div>
          </div>
      {/* Footer Section */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default ContactUs;
