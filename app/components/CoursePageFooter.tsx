import Image from "next/image";
import React from "react";

const CoursePageFooter = () => {
  return (
    <footer className="bg-blue-50">
      {/* Course Creator Support Section */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Course Creator Support
          </h2>
          <p className="text-gray-600 mb-6">
            Create and upload your courses effortlessly with our free editing
            and publishing assistance.
            <br />
            To get started, send a mail to{" "}
            <a
              href="mailto:minimalisticlearning2024@gmail.com"
              className="text-blue-600 font-medium underline"
            >
              minimalisticlearning2024@gmail.com
            </a>
          </p>
          <Image
            src="https://via.placeholder.com/150"
            alt="Email Illustration"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto text-white">
          <div className="flex flex-wrap justify-between">
            {/* Links */}
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="font-bold">About</h3>
              <a href="#" className="hover:underline">
                About Us
              </a>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
              <a href="#" className="hover:underline">
                Testimonials
              </a>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <h3 className="font-bold">Courses</h3>
              <a href="#" className="hover:underline">
                Help and Support
              </a>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <h3 className="font-bold">Terms</h3>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Cookie Settings
              </a>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-sm">
              © 2024 Minimalistic Learning. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-80">
                <Image
                  src="https://via.placeholder.com/24"
                  alt="Facebook"
                  width={6}
                  height={6}
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <Image
                  src="https://via.placeholder.com/24"
                  alt="Twitter"
                  width={6}
                  height={6}
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <Image
                  src="https://via.placeholder.com/24"
                  alt="YouTube"
                  width={6}
                  height={6}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CoursePageFooter;
