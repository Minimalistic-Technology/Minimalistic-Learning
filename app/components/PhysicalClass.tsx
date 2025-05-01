import React from "react";

const PhysicalClass = () => {
  return (
    <section className="bg-[#daf0ff] py-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Physical Classes
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Schedule Management
          <br />
          <span className="text-sm">
            N.B: Rescheduling can only be done 48 hours before the scheduled session.
          </span>
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-6 8h6m-6 4h6m-6 4h6M3 8h18M4 8v12h16V8"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Upcoming Sessions</h3>
            <p className="text-gray-600 text-sm mt-2">6</p>
          </div>

          {/* Card 2: Tutor Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25m-7.5 3.75V5.25m7.5 3.75c0 1.657-1.343 3-3 3S9.75 9.657 9.75 8m6 3c0 1.105-.895 2-2 2H9.75a2 2 0 01-2-2m6 3h2.5M9.75 8v3m0 0H7.25m12.5 0v6H4.25v-6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Tutor Details</h3>
            <p className="text-gray-600 text-sm mt-2">Name: John Doe</p>
            <p className="text-gray-600 text-sm mt-1">Course: Mathematics</p>
            <p className="text-gray-600 text-sm mt-1">Price: £20/hour</p>
          </div>

          {/* Card 3: Class Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8h18M4 8v12h16V8m-8-4V3m4 8h-8"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Class Information</h3>
            <p className="text-gray-600 text-sm mt-2">
              Venue: 12 Lake road, Coventry
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Date: Monday and Thursday, 7:00pm
            </p>
            <p className="text-gray-600 text-sm mt-1">Class Duration: 1 hour</p>
            <p className="text-gray-600 text-sm mt-1">Class Type: One-on-one</p>
            <button className="flex mt-4 px-2 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Reschedule Class
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicalClass;
