import Image from "next/image";

export default function WhyUs() {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="max-w-6xl flex flex-col md:flex-row items-center h-1/2 p-8 mb-10">
          {/* Left Section - Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <Image
              src="/images/pana.png"
              width={2000}
              height={2000}
              alt="Learning Illustration"
              className="rounded-lg"
            />
          </div>

          {/* Right Section - Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Why choose Minimalistic Learning?
            </h2>
            <h3 className="text-2xl text-blue-500 mb-4">
              Courses for All Levels
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              From beginners to advanced learners, we offer courses that cater
              to all skill levels.
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 items-center justify-center h-1/2 p-8 mb-10">
        {/* First Section */}
        <div className="max-w-6xl flex flex-col md:flex-row items-center gap-8">
          {/* Left Section - Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Learn at Your Own Pace
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Access content 24/7 and study whenever it fits into your schedule.
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/pana (1).png"
              width={2000}
              height={2000}
              alt="Learn at Your Own Pace"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 items-center justify-center p-8 mb-10">
        {/* Section 1: Earn Recognised Certificates */}
        <div className="max-w-6xl flex flex-col md:flex-row items-center gap-8">
          {/* Left Section - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/pana (2).png"
              width={2000}
              height={2000}
              alt="Certificates Illustration"
              className="rounded-lg"
            />
          </div>

          {/* Right Section - Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Earn Recognised Certificates
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Receive certificates that are widely recognised in the industry.
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 items-center justify-center p-8 mb-10">
        {/* Section 2: Learn from Industry Experts */}
        <div className="max-w-6xl flex flex-col md:flex-row items-center gap-8">
          {/* Left Section - Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Learn from Industry Experts
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Our instructors are seasoned professionals with years of
              experience in their fields.
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/pana (3).png"
              width={2000}
              height={2000}
              alt="Experts Illustration"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}