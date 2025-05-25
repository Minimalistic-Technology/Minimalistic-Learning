import React from "react";
import {
  BookOpen,
  Video,
  Users,
  Calendar,
  Target,
  MessageCircle,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Interactive Course Library",
      description:
        "Access a vast collection of online courses across multiple disciplines, with adaptive learning paths tailored to individual student needs.",
    },
    {
      icon: <Video className="w-12 h-12 text-green-600" />,
      title: "Live Tutoring Sessions",
      description:
        "Connect with expert tutors in real-time through high-quality video sessions for personalized learning experiences.",
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: "Peer Study Groups",
      description:
        "Join collaborative study groups, share knowledge, and learn together with students from around the world.",
    },
    {
      icon: <Calendar className="w-12 h-12 text-orange-600" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with comprehensive progress tracking, goal setting, and performance analytics.",
    },
    {
      icon: <Target className="w-12 h-12 text-red-600" />,
      title: "Skill Assessment",
      description:
        "Take personalized skill assessment tests to identify strengths and areas for improvement across various subjects.",
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-teal-600" />,
      title: "24/7 Academic Support",
      description:
        "Get instant homework help, assignment guidance, and academic counseling through our round-the-clock support system.",
    },
  ];

  return (
    <section className="max-w-6xl p-10 mx-auto min-h-screen ">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold leading-[1.3] bg-black bg-clip-text text-transparent mb-4">
            Upcoming Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering students with comprehensive learning solutions designed
            to support academic success and personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="ml-4 text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
