import React from "react";
import Footer from "../components/Footer";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#daf0ff] text-gray-800">
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms and Conditions – MinimalisticLearning</h1>
        <p className="text-sm text-gray-600 mb-6 text-center"><strong>Effective Date:</strong> May 3, 2025</p>

        <p className="mb-4">
          Welcome to MinimalisticLearning (“we,” “our,” “us”). These Terms and Conditions (“Terms”)
          govern your access to and use of our website (
          <a
            href="https://www.minimalisticlearning.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.minimalisticlearning.com
          </a>
          ), including all content, features, and services provided.
        </p>

        <p className="mb-6">
          By using this website, you agree to be bound by these Terms. If you do not agree, please do not use MinimalisticLearning.
        </p>

        <hr className="border-gray-300 mb-6" />

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Purpose of the Website</h2>
          <ul className="list-disc list-inside mb-2">
            <li>Learning and Education</li>
            <li>Research and Development</li>
            <li>Community Engagement and Support</li>
          </ul>
          <p>Our mission is to foster growth in knowledge-sharing and collaborative development. All content and contributions should reflect this core purpose.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Acceptable Use</h2>
          <ul className="list-disc list-inside mb-2">
            <li>Post content that aligns with ethical, educational, and professional standards.</li>
            <li>
              Do not upload or distribute content that promotes:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Hate speech</li>
                <li>Terrorism or radical ideology</li>
                <li>Violence, discrimination, or harassment</li>
                <li>Misinformation or harmful practices</li>
              </ul>
            </li>
          </ul>
          <p>Users who violate these terms may have their accounts suspended or content removed without notice. We may report unlawful activity to the relevant authorities.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. User-Generated Content</h2>
          <ul className="list-disc list-inside">
            <li>You retain ownership of your content.</li>
            <li>You grant us a non-exclusive, royalty-free, global license to use, store, publish, display, and share it.</li>
            <li>We may remove content that violates these Terms or laws.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Data Usage and Third-Party Sharing</h2>
          <ul className="list-disc list-inside">
            <li>Used for educational research and academic development</li>
            <li>Used for community learning and open development</li>
            <li>Never sold or used for commercial exploitation</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            All original content (excluding user submissions), such as logos, code, and design, is protected under copyright
            and trademark laws. You may not reuse our proprietary materials without permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Disclaimers</h2>
          <ul className="list-disc list-inside">
            <li>We do not guarantee the accuracy of user-generated content.</li>
            <li>We are not liable for damages due to misuse of content or third-party actions.</li>
            <li>All materials are provided “as is” for educational use only.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, MinimalisticLearning and its team are not responsible for any direct,
            indirect, incidental, or consequential damages from use of the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <p>We may update these Terms occasionally. Continued use of the website means you accept any changes made.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            For questions or concerns regarding these Terms, reach out to us at:<br />
            📧{" "}
            <a
              href="mailto:MinimalisticLearning2024@gmail.com"
              className="text-blue-600 underline"
            >
              MinimalisticLearning2024@gmail.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
