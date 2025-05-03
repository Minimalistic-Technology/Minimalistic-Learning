const Footer = () => {
  return (
    <footer className="relative bg-blue-700 text-white pt-16 pb-8">
      {/* Top Curve */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-16 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,120 900,0 1200,120 L1200,0 L0,0 Z"
            className="fill-[#daf0ff]"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About us</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="/contactus" className="hover:text-gray-50 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-50 transition">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Courses</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="#" className="hover:text-gray-50 transition">
                Help and Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-50 transition">
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Terms</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="#" className="hover:text-gray-50 transition">
                Privacy Policy
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-gray-50 transition">
                Cookie settings
              </a>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-600 my-8"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <span className="text-xl text-blue-300 font-semibold tracking-wider">
            MINIMALISTIC LEARNING
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* <a href="https://www.facebook.com/" className="hover:text-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2H6C3.8 2 2 3.8 2 6v12c0 2.2 1.8 4 4 4h6V14H9v-4h3V7.7C12 5 13.7 3.5 16 3.5c.8 0 1.5.1 1.7.1v3h-1.9c-1.5 0-1.8.7-1.8 1.7V10h3l-.5 4h-2.5v8h4c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4z" />
            </svg>
          </a> */}
          <a href="https://x.com/Minimal_Learn" className="hover:text-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.46 6c-.8.4-1.7.7-2.6.8a4.5 4.5 0 001.9-2.5c-.9.5-1.9.9-3 1.1A4.5 4.5 0 0016.5 4c-2.5 0-4.5 2-4.5 4.5 0 .3 0 .6.1.9a12.9 12.9 0 01-9.4-4.8c-.3.5-.5 1.2-.5 1.8 0 1.6.8 3 2 3.8-.7 0-1.3-.2-1.9-.5v.1c0 2.2 1.6 4 3.7 4.4a4.5 4.5 0 01-1.2.2c-.3 0-.6 0-.8-.1.6 2 2.4 3.5 4.5 3.6a9 9 0 01-6.6 1.8A12.7 12.7 0 007.5 20c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.7-1.5 2.3-2.6z" />
            </svg>
          </a>
          {/* <a href="https://www.youtube.com/" className="hover:text-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.6 3H4.4C3.6 3 3 3.6 3 4.4v15.2c0 .8.6 1.4 1.4 1.4h15.2c.8 0 1.4-.6 1.4-1.4V4.4c0-.8-.6-1.4-1.4-1.4zM10 16V8l6 4-6 4z" />
            </svg>
          </a> */}
          {/* <a href="https://www.instagram.com/" className="hover:text-gray-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 8.5 12 8.5s2.5 1.1 2.5 2.5S13.4 13.5 12 13.5zm4.5-6.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
            </svg>
          </a> */}
          <a href="https://www.linkedin.com/company/minimalisticlearning/" className="hover:text-gray-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8.98h4v12H3v-12zM9.5 8.98H13v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.3v6.9h-4v-6.1c0-1.5 0-3.5-2.2-3.5s-2.6 1.7-2.6 3.4v6.2h-4v-12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-200 text-sm mt-6">
        © 2025 Minimalistic Learning. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
