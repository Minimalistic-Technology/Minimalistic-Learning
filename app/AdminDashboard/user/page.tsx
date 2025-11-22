"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
// API integration removed
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Save,
  Edit2,
  Calendar,
  BookOpen,
  TrendingUp,
  Settings,
  Bell,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default function UserProfilePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email : "User",
    email: "",
    bio: "Passionate learner sharing insights on Minimalistic Learning.",
    joinDate: new Date().toISOString(),
  });

  useEffect(() => {
    if (!user) {
      router.push("/AdminDashboard");
      return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedJoinDate = localStorage.getItem("joinDate") || new Date().toISOString();
    
    setFormData((prev) => ({
      ...prev,
      email: storedEmail || user.email || "",
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "User",
      joinDate: storedJoinDate,
    }));
  }, [user, router]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      // Update local storage
      localStorage.setItem("username", formData.name);
      if (formData.email) {
        localStorage.setItem("email", formData.email);
      }
      // Update user object with new name
      if (user) {
        const nameParts = formData.name.split(" ");
        setUser({
          ...user,
          email: formData.email || user.email,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
        });
      }
      setIsEditing(false);
      toast.success("Profile updated successfully");
      setIsSaving(false);
    }, 500);
  };

  const mockStats = {
    blogsPublished: 12,
    totalViews: 3450,
    likesReceived: 128,
    comments: 45,
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 pb-16">
      <ScrollProgressBar />
      
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Back Button */}
        <Link
          href="/AdminDashboard"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-[#2563eb] shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/95 px-8 py-10 shadow-2xl backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 via-sky-200/20 to-transparent blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2563eb] to-sky-400 opacity-30 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-indigo-500 text-3xl font-bold text-white shadow-lg">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-2xl font-semibold text-slate-900 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    />
                  ) : (
                    <h1 className="text-3xl font-semibold text-slate-900">
                      {formData.name}
                    </h1>
                  )}
                  <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#2563eb]" />
                    ) : isEditing ? (
                      <>
                        <Save className="h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-500">
                  Member since {format(new Date(formData.joinDate), "MMMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Blogs Published",
              value: mockStats.blogsPublished,
              icon: BookOpen,
              accent: "from-blue-500 to-blue-600",
            },
            {
              label: "Total Views",
              value: mockStats.totalViews.toLocaleString(),
              icon: TrendingUp,
              accent: "from-emerald-500 to-emerald-600",
            },
            {
              label: "Likes Received",
              value: mockStats.likesReceived,
              icon: TrendingUp,
              accent: "from-rose-500 to-rose-600",
            },
            {
              label: "Comments",
              value: mockStats.comments,
              icon: BookOpen,
              accent: "from-amber-500 to-amber-600",
            },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                {label}
                <Icon className="h-4 w-4 text-slate-400" />
              </div>
              <p
                className={`bg-gradient-to-r ${accent} bg-clip-text text-3xl font-bold text-transparent`}
              >
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* Profile Details */}
        <section className="grid gap-6 rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb]">
                <User className="h-4 w-4" />
              </span>
              Profile Information
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {formData.email || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {formData.bio}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Member Since
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {format(new Date(formData.joinDate), "PPP")}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb]">
                <Settings className="h-4 w-4" />
              </span>
              Quick Actions
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Change Password",
                  icon: Lock,
                  onClick: () => alert("Password change feature coming soon!"),
                },
                {
                  label: "Notification Settings",
                  icon: Bell,
                  onClick: () => alert("Notification settings coming soon!"),
                },
                {
                  label: "Privacy Settings",
                  icon: Shield,
                  onClick: () => alert("Privacy settings coming soon!"),
                },
              ].map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

