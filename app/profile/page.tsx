"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";

// Define a type for user data
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type ProfilePayload = {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

export default function Profile_pg() {
  // Use UserData type for userData state
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [profileExists, setProfileExists] = useState<boolean>(false);

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    const [firstName, lastName] = username.trim().split(" ", 2); // Safe split

    if (email) {
      setUserData({
        firstName: firstName || "",
        lastName: lastName || "",
        email,
      });
      setProfileExists(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const token = localStorage.getItem("accessToken"); // Assuming you stored the JWT as 'token'

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/blogs/my-blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Error fetching blogs:",
            data.error || response.statusText
          );
          return;
        }

        console.log("User Blogs:", data); // Or store them in state
        setUserBlogs(data); // If you want to display them
      } catch (err) {
        console.error("Error while fetching blogs:", err);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccessMsg("");

    if (
      !userData.firstName.trim() ||
      !userData.lastName.trim() ||
      !userData.email.trim()
    ) {
      setError("First name, last name and email are required.");
      return;
    }

    if (isEditing && (newPassword || confirmPassword || currentPassword)) {
      if (!currentPassword) {
        setError("Please enter your current password to change your password.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }
    }

    try {
      const payload: ProfilePayload = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      if (isEditing && currentPassword) {
        payload.currentPassword = currentPassword;
        if (newPassword) payload.newPassword = newPassword;
        if (confirmPassword) payload.confirmPassword = confirmPassword;
      }

      let response: Response;

      // Try fetching profile first to check if it exists
      const checkRes = await fetch(
        `http://localhost:5000/api/profile?email=${userData.email}`
      );
      let profileData = null;

      if (checkRes.ok) {
        profileData = await checkRes.json();
      }

      // If profile does not exist, create it first
      if (!profileData) {
        if (!newPassword || newPassword !== confirmPassword) {
          setError(
            "To create a profile, password is required and should match confirm password."
          );
          return;
        }

        // Add password for creation
        payload.password = newPassword;

        response = await fetch("http://localhost:5000/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Profile exists, proceed to update it
        response = await fetch("http://localhost:5000/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred");
        return;
      }

      setSuccessMsg(
        profileData
          ? "Profile updated successfully."
          : "Profile created successfully."
      );
      localStorage.setItem("username", `${data.firstName} ${data.lastName}`);
      localStorage.setItem("email", data.email);

      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
      setProfileExists(true);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError("Failed to save profile.");
      console.error(err);
    }
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

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md border border-green-300 flex justify-between items-center">
            <p className="text-sm font-medium">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg("")}
              className="text-green-600 text-lg font-bold hover:text-green-800"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex lg:flex-row gap-8">
          {/* Left Section */}
          <div className="lg:w-3/5 space-y-8">
            {/* Profile Info */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <h2 className="text-2xl font-bold text-black">Your Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 mb-1 text-sm">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                    />
                  ) : (
                    <p className="p-2 bg-blue-100 rounded-md text-black">
                      {userData.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-700 mb-1 text-sm">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                    />
                  ) : (
                    <p className="p-2 bg-blue-100 rounded-md text-black">
                      {userData.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-700 mb-1 text-sm">
                    Email
                  </label>
                  <p className="p-2 bg-blue-100 rounded-md text-black">
                    {userData.email}
                  </p>
                </div>

                <div>
                  {isEditing ? (
                    <>
                      <p className="mb-2 font-semibold text-black">
                        Change Password
                      </p>
                      <div className="mb-3">
                        <label className="block text-blue-700 mb-1 text-sm">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-blue-700 mb-1 text-sm">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 rounded-md border border-blue-300 bg-blue-50 text-black"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
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
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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

              <div className="flex justify-between mt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            {/* My Blogs */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-black mb-3">My Blogs</h2>
             <section className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-5">
  {userBlogs.length > 0 ? (
    userBlogs.map((blog) => (
      <div
        key={blog._id}
        className="bg-white border border-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 flex flex-col p-5 h-44 w-full sm:w-[48%] lg:w-[31%]"
      >
        {/* Category */}
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
          {blog.category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-3 mb-auto">
          {blog.title}
        </h2>

        {/* Read More Button */}
        <a
          href={`/blog/${blog._id}`}
          className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition"
        >
          Read More
        </a>
      </div>
    ))
  ) : (
    <p className="w-full text-center text-gray-500 text-lg">
      No blogs published yet.
    </p>
  )}
</section>

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
