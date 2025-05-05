"use client";

import React, { useState } from "react";

const PrivacyPolicyPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to MinimalisticLearning</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View Privacy Policy
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg p-6 shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
            >
              &times;
            </button>

            <div className="space-y-4 text-gray-800">
              <h2 className="text-2xl font-bold">Privacy Policy – MinimalisticLearning</h2>
              <p><strong>Effective Date:</strong> May 3, 2025</p>
              <p>
                At MinimalisticLearning ("we", "our", "us"), your privacy is our priority. This Privacy Policy outlines how we collect, use, disclose, and manage your data in compliance with the General Data Protection Regulation (GDPR) and the Indian Information Technology Act, 2000 (as amended by the IT Rules, 2024).
              </p>
              <p>By using MinimalisticLearning, you agree to the terms of this Privacy Policy.</p>
              <hr />

              <h3 className="font-semibold">1. Information We Collect</h3>
              <ul className="list-disc ml-6">
                <li><strong>Personal Information:</strong> Name, email, IP, geolocation, contact details.</li>
                <li><strong>User Content:</strong> Blogs, comments, images, or materials you post.</li>
                <li><strong>Usage Data:</strong> Browser type, device info, access times, pages visited.</li>
              </ul>

              <h3 className="font-semibold">2. Use of Collected Data</h3>
              <ul className="list-disc ml-6">
                <li>Operating and improving MinimalisticLearning</li>
                <li>Communicating with users</li>
                <li>Moderating and managing user content</li>
                <li>Complying with GDPR and Indian IT Act obligations</li>
                <li>Marketing, analytics, and security</li>
              </ul>

              <h3 className="font-semibold">3. User-Generated Content Disclaimer</h3>
              <ul className="list-disc ml-6">
                <li>You are fully responsible for the content you upload.</li>
                <li>We disclaim liability for offensive/illegal content.</li>
                <li>We may remove/report violations of laws or policies.</li>
              </ul>

              <h3 className="font-semibold">4. Content Ownership and Usage Rights</h3>
              <ul className="list-disc ml-6">
                <li>You retain copyright.</li>
                <li>We get a royalty-free license to use content for distribution/hosting.</li>
              </ul>

              <h3 className="font-semibold">5. Sharing and Disclosure of Data</h3>
              <ul className="list-disc ml-6">
                <li>To legal authorities when required</li>
                <li>To trusted third-party services (e.g., analytics, marketing)</li>
                <li>During business transfers</li>
                <li>We do not sell your personal data</li>
              </ul>

              <h3 className="font-semibold">6. GDPR Rights (For EU Residents)</h3>
              <ul className="list-disc ml-6">
                <li>Access, rectify, erase, restrict, object, portability, withdraw consent</li>
                <li>Contact: <a href="mailto:MinimalisticLearning2024@gmail.com" className="text-blue-600">MinimalisticLearning2024@gmail.com</a></li>
              </ul>

              <h3 className="font-semibold">7. Compliance with Indian IT Act, 2000 (IT Rules, 2024)</h3>
              <ul className="list-disc ml-6">
                <li>Security practices for safeguarding data</li>
                <li>Users are responsible for posted violations</li>
                <li>We cooperate with Indian authorities when required</li>
              </ul>

              <h3 className="font-semibold">8. Cookies and Tracking Technologies</h3>
              <ul className="list-disc ml-6">
                <li>Track usage and improve UX</li>
                <li>Deliver personalized content and ads</li>
                <li>You can disable cookies via browser settings</li>
              </ul>

              <h3 className="font-semibold">9. Data Retention</h3>
              <p>We retain your data only as long as necessary for the purposes described or as legally required.</p>

              <h3 className="font-semibold">10. Data Security</h3>
              <p>We use technical and organizational measures to protect your data, but no system is 100% secure.</p>

              <h3 className="font-semibold">11. Changes to This Policy</h3>
              <p>We may update this policy periodically. Updates will be posted with a new effective date.</p>

              <h3 className="font-semibold">12. Contact Us</h3>
              <p>
                For any questions or data-related requests, contact us at:<br />
                <a href="mailto:MinimalisticLearning2024@gmail.com" className="text-blue-600 underline">
                  MinimalisticLearning2024@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;
