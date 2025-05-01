import Image from 'next/image'
import React from 'react'

const ExploreTutor = () => {
  return (
    <div>
      <section className="bg-[#daf0ff] min-h-[438px] flex items-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-10">
          {/* Left Content */}
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Explore a wide range of courses designed to meet diverse learning needs.
            </h1>
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Hire a Tutor
              </button>
              <button className="px-6 py-3 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300">
                Customise Courses
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="justify-end top-0 right-0 text-sm text-gray-600 flex items-center gap-2">
              <span>John Doe</span>
              <Image
                src="https://cdn4.vectorstock.com/i/1000x1000/18/58/color-silhouette-cartoon-half-body-faceless-man-vector-15091858.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <Image
              src="/images/herostudent.png"
              alt="Student"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExploreTutor
