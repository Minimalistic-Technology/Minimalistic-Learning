"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Profile_pg() {
  const [userData, setUserData] = useState({
    id: "",
    Name: "",
    Email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load user info from localStorage after login
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
      setUserData({
        id: "N/A", // or from storage if available
        Name: username,
        Email: email,
      });
    }
  }, []);

  const handleUpdateProfile = () => {
    if (!userData.Name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    // Update localStorage with new name (email assumed constant)
    localStorage.setItem("username", userData.Name);

    setIsEditing(false);
    setError("");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto rounded-2xl p-8 space-y-10">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-300 flex justify-between items-center">
            <p className="text-sm font-medium">{error}</p>
            <button
              onClick={() => setError("")}
              className="text-red-600 text-lg font-bold hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section */}
          <div className="lg:w-1/2 space-y-8">
            {/* Profile Info */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <h2 className="text-2xl font-bold text-black">Your Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 mb-1 text-sm">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.Name}
                      onChange={(e) =>
                        setUserData({ ...userData, Name: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                    />
                  ) : (
                    <p className="p-2 bg-blue-100 rounded-md text-black">
                      {userData.Name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-700 mb-1 text-sm">
                    Email
                  </label>
                  <p className="p-2 bg-blue-100 rounded-md text-black">
                    {userData.Email}
                  </p>
                </div>
                <div>
                  {isEditing ? (
                    <> <p> Want to change Password ?</p>
                      <div>
                        <label className="block text-blue-700 mb-1 text-sm">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-700 mb-1 text-sm">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-700 mb-1 text-sm">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-blue-700 mb-1 text-sm">
                        Password
                      </label>
                      <p className="p-2 bg-blue-100 rounded-md text-black">
                        ********
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {isEditing ? (
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* My Blogs */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-black mb-3">My Blogs</h2>
              <p className="text-blue-800">No blogs to display.</p>
            </div>
          </div>

          {/* Right Section: FAQs */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <h2 className="text-2xl font-bold text-black">
                Frequently Asked Questions
              </h2>

              <div className="space-y-5 text-blue-900 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold mb-1">
                    1. How do I publish a blog?
                  </h4>
                  <p>
                    Go to the "Create Blog" section, fill in the title, content,
                    and click "Publish".
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    2. Can I edit a published blog?
                  </h4>
                  <p>
                    Yes, you can edit or delete blogs from the "My Blogs"
                    section anytime.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    3. Who can view my blogs?
                  </h4>
                  <p>
                    All published blogs are publicly visible unless marked
                    private.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
