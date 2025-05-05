"use client";

import React from "react";
import Footer from "../components/Footer";
import Glance from "../components/Glance";

const HelpSupportPage = () => {
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

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-blue-600">How do I reset my password?</h3>
            {/* <p className="text-sm text-gray-600">Go to the login page and click on “Forgot Password”. Follow the instructions sent to your email.</p> */}
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">How can I contact my instructor?</h3>
            {/* <p className="text-sm text-gray-600">Use the in-app messaging system or email provided on the course details page.</p> */}
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">Where can I see my blog's?</h3>
            {/* <p className="text-sm text-gray-600">Go to your dashboard and click on "My Attendance" to see weekly, monthly, and yearly charts.</p> */}
          </div>
        </div>
      </section>

      {/* Contact Form */}
        <div className="bg-[#daf0ff] mt-12">
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Still Need Help?
        </h1>
          <p className="text-md text-gray-600 text-center mb-8">Fill out the form below and our team will get back to you shortly.</p>

          <Glance/>
        </div>
      <Footer />
    </div>
  );
};

export default HelpSupportPage;
