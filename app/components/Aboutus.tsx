import Image from "next/image";
import React from "react";
import Footer from "./Footer";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Harsh Ratnani",
      role:
        "Visionary leader with a passion for education and technology innovation.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Parth Doshi",
      role:
        "Expert in operational strategy and user-focused solutions, fostering collaboration and growth.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Priyal Vyas",
      role: "Visionary leader with a passion for education and technology innovation.",
      img: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=",
    },
    {
      name: "Manan Doshi",
      role:
        "User Experience and User Interface Designer.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Mahesh Kumar Thever",
      role:
        "User Experience and User Interface Designer.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sunny Radhakrishna",
      role: "User Experience and User Interface Designer",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sadashive Zore",
      role:
        "User Experience and User Interface Designer.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sandip Baranwal",
      role: "User Experience and User Interface Designer.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="bg-[#daf0ff] min-h-screen">
      {/* Our Journey Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          {/* Journey Text */}
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-purple-600 mb-6">
              Our Journey
            </h2>
            <p className="text-gray-600 mb-4">
              <strong className="text-lg">2024: Building the Team</strong>
              <br />
              Co-founders brought together developers and education enthusiasts
              to design a platform that simplifies the process for educators
              and improves learning outcomes for students.
            </p>
            <p className="text-gray-600">
              <strong className="text-lg">2025: Beta Version Launched</strong>
              <br />
              Released the platform’s first version, offering basic course
              creation tools and support for educators.
            </p>
          </div>
          {/* Journey Image */}
          <div className="md:w-1/3 flex justify-end">
            <Image
              src="https://media.istockphoto.com/id/157284581/photo/road-by-night.jpg?s=612x612&w=0&k=20&c=utloT84rFRHikE2EcrnG5N-bE_R4dQEfKcgrPxGjUyY="
              alt="Journey Image"
              width={300}
              height={300}
              className="rounded-full shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 bg-[#daf0ff]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-purple-600 mb-10">
            Meet Our Team
          </h2>
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;
