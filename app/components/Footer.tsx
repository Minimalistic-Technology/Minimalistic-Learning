"use client";
import { useState } from "react";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blog" },
      { label: "Create Blog", href: "/blog/createblogs" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Admin Dashboard", href: "/AdminDashboard" },
      {
        label: "Support",
        href: "mailto:minimalisticlearning2024@gmail.com",
      },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "X (Twitter)",
        href: "https://x.com/Minimal_Learn",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/minimalisticlearning/",
        external: true,
      },
    ],
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/Minimal_Learn",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.8.4-1.7.7-2.6.8a4.5 4.5 0 001.9-2.5c-.9.5-1.9.9-3 1.1A4.5 4.5 0 0016.5 4c-2.5 0-4.5 2-4.5 4.5 0 .3 0 .6.1.9a12.9 12.9 0 01-9.4-4.8c-.3.5-.5 1.2-.5 1.8 0 1.6.8 3 2 3.8-.7 0-1.3-.2-1.9-.5v.1c0 2.2 1.6 4 3.7 4.4a4.5 4.5 0 01-1.2.2c-.3 0-.6 0-.8-.1.6 2 2.4 3.5 4.5 3.6a9 9 0 01-6.6 1.8A12.7 12.7 0 007.5 20c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.7-1.5 2.3-2.6z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/minimalisticlearning/",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8.98h4v12H3v-12zm6.5 0H13v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.3v6.9h-4v-6.1c0-1.5 0-3.5-2.2-3.5s-2.6 1.7-2.6 3.4v6.2h-4v-12z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1220] text-slate-100">
      <div className="relative mx-auto max-w-6xl space-y-10 px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/30 via-sky-500/10 to-transparent opacity-80 blur-3xl" />
            <div className="relative space-y-5">
              <p className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                Minimalistic Learning
              </p>
              <h3 className="text-3xl font-semibold leading-tight text-white">
                Calm interfaces for focused learning.
              </h3>
              <p className="text-sm text-slate-200">
                Build, publish, and curate knowledge with the same design
                language powering the Admin Dashboard.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold">
                <span className="rounded-full border border-white/30 px-3 py-1 text-slate-200">
                  Ambient UI
                </span>
                <span className="rounded-full border border-white/30 px-3 py-1 text-slate-200">
                  Progress-first
                </span>
                <span className="rounded-full border border-white/30 px-3 py-1 text-slate-200">
                  Human curated
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl backdrop-blur">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                  {section.title}
                </p>
                <ul className="space-y-2 text-sm text-slate-200">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
                      >
                        {link.label}
                        {link.external && (
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                  {section.title === "Platform" && (
                    <li>
                      <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
                      >
                        Privacy Policy
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-slate-300 shadow-inner">
          <p>© 2025 Minimalistic Learning • Built with clarity in mind.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#daf0ff] p-6 text-gray-800 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 text-2xl text-gray-600 transition hover:text-black"
            >
              &times;
            </button>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Privacy Policy – MinimalisticLearning
              </h2>
              <p>
                <strong>Effective Date:</strong> May 3, 2025
              </p>
              <p>
                At MinimalisticLearning (&quot;we&quot;, &quot;our&quot;,
                &quot;us&quot;), your privacy is our priority. This Privacy
                Policy outlines how we collect, use, disclose, and manage your
                data in compliance with the General Data Protection Regulation
                (GDPR) and the Indian Information Technology Act, 2000 (as
                amended by the IT Rules, 2024).
              </p>
              <p>
                By using MinimalisticLearning, you agree to the terms of this
                Privacy Policy.
              </p>
              <hr />

              <h3 className="font-semibold">1. Information We Collect</h3>
              <ul className="ml-6 list-disc">
                <li>
                  <strong>Personal Information:</strong> Name, email, IP,
                  geolocation, contact details.
                </li>
                <li>
                  <strong>User Content:</strong> Blogs, comments, images, or
                  materials you post.
                </li>
                <li>
                  <strong>Usage Data:</strong> Browser type, device info, access
                  times, pages visited.
                </li>
              </ul>

              <h3 className="font-semibold">2. Use of Collected Data</h3>
              <ul className="ml-6 list-disc">
                <li>Operating and improving MinimalisticLearning</li>
                <li>Communicating with users</li>
                <li>Moderating and managing user content</li>
                <li>Complying with GDPR and Indian IT Act obligations</li>
                <li>Marketing, analytics, and security</li>
              </ul>

              <h3 className="font-semibold">
                3. User-Generated Content Disclaimer
              </h3>
              <ul className="ml-6 list-disc">
                <li>You are fully responsible for the content you upload.</li>
                <li>We disclaim liability for offensive/illegal content.</li>
                <li>We may remove/report violations of laws or policies.</li>
              </ul>

              <h3 className="font-semibold">
                4. Content Ownership and Usage Rights
              </h3>
              <ul className="ml-6 list-disc">
                <li>You retain copyright.</li>
                <li>
                  We get a royalty-free license to use content for
                  distribution/hosting.
                </li>
              </ul>

              <h3 className="font-semibold">5. Sharing and Disclosure of Data</h3>
              <ul className="ml-6 list-disc">
                <li>To legal authorities when required</li>
                <li>To trusted third-party services (e.g., analytics, marketing)</li>
                <li>During business transfers</li>
                <li>We do not sell your personal data</li>
              </ul>

              <h3 className="font-semibold">6. GDPR Rights (For EU Residents)</h3>
              <ul className="ml-6 list-disc">
                <li>
                  Access, rectify, erase, restrict, object, portability, withdraw
                  consent
                </li>
                <li>
                  Contact:{" "}
                  <a
                    href="mailto:MinimalisticLearning2024@gmail.com"
                    className="text-blue-600"
                  >
                    MinimalisticLearning2024@gmail.com
                  </a>
                </li>
              </ul>

              <h3 className="font-semibold">
                7. Compliance with Indian IT Act, 2000 (IT Rules, 2024)
              </h3>
              <ul className="ml-6 list-disc">
                <li>Security practices for safeguarding data</li>
                <li>Users are responsible for posted violations</li>
                <li>We cooperate with Indian authorities when required</li>
              </ul>

              <h3 className="font-semibold">
                8. Cookies and Tracking Technologies
              </h3>
              <ul className="ml-6 list-disc">
                <li>Track usage and improve UX</li>
                <li>Deliver personalized content and ads</li>
                <li>You can disable cookies via browser settings</li>
              </ul>

              <h3 className="font-semibold">9. Data Retention</h3>
              <p>
                We retain your data only as long as necessary for the purposes
                described or as legally required.
              </p>

              <h3 className="font-semibold">10. Data Security</h3>
              <p>
                We use technical and organizational measures to protect your
                data, but no system is 100% secure.
              </p>

              <h3 className="font-semibold">11. Changes to This Policy</h3>
              <p>
                We may update this policy periodically. Updates will be posted
                with a new effective date.
              </p>

              <h3 className="font-semibold">12. Contact Us</h3>
              <p>
                For any questions or data-related requests, contact us at:
                <br />
                <a
                  href="mailto:MinimalisticLearning2024@gmail.com"
                  className="text-blue-600 underline"
                >
                  MinimalisticLearning2024@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

