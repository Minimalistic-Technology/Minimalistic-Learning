"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarClock,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  Quote,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import ScrollProgressBar from "../components/ScrollerProgress";
import { ThemeToggle } from "../components/ThemeToggle";
import { adminAPI } from "../lib/api";

type TrendTone = "success" | "info" | "warning";

interface Blog {
  _id: string;
  title: string;
  description: string;
  date: string;
  author?: string;
}

interface QuoteBlog {
  _id: string;
  quote: string;
  name: string;
  title: string;
  createdAt: string;
}

interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  time: string;
  tone: TrendTone;
  icon: React.ElementType;
}

interface DashboardStat {
  label: string;
  value: number | string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

interface ContentInsight {
  label: string;
  value: string;
  helper: string;
}

const mockBlogs: Blog[] = [
  {
    _id: "1",
    title: "Understanding React Hooks",
    description: "A deep dive into useState and useEffect...",
    date: "2024-10-25T10:00:00Z",
    author: "Jane Doe",
  },
  {
    _id: "2",
    title: "Next.js 14: What's New?",
    description: "Exploring the latest features in Next.js...",
    date: "2024-10-24T14:30:00Z",
    author: "John Smith",
  },
  {
    _id: "3",
    title: "Tailwind CSS for Beginners",
    description: "How to set up and use Tailwind CSS...",
    date: "2024-10-23T09:15:00Z",
    author: "Alex Johnson",
  },
  {
    _id: "4",
    title: "TypeScript in 2024",
    description: "Why TypeScript is essential for modern web dev...",
    date: "2024-10-22T11:00:00Z",
    author: "Emily White",
  },
  {
    _id: "5",
    title: "Mastering Client-Side Routing",
    description: "A comprehensive guide to routing in SPAs...",
    date: "2024-10-21T16:45:00Z",
    author: "Michael Brown",
  },
];

const mockQuotes: QuoteBlog[] = [
  {
    _id: "q1",
    quote: "The only way to do great work is to love what you do.",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    createdAt: "2024-10-25T00:00:00Z",
  },
  {
    _id: "q2",
    quote: "Innovation distinguishes between a leader and a follower.",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    createdAt: "2024-10-24T00:00:00Z",
  },
  {
    _id: "q3",
    quote:
      "Your time is limited, don't waste it living someone else's life.",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    createdAt: "2024-10-23T00:00:00Z",
  },
  {
    _id: "q4",
    quote: "Stay hungry, stay foolish.",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    createdAt: "2024-10-22T00:00:00Z",
  },
  {
    _id: "q5",
    quote: "The future is today, not tomorrow.",
    name: "A Proverb",
    title: "Wisdom",
    createdAt: "2024-10-21T00:00:00Z",
  },
];

const navigationItems = [
  {
    label: "Overview",
    href: "/AdminDashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Blog Library",
    href: "/AdminDashboard/blogsAdmin",
    icon: FileText,
  },
  {
    label: "Quotes Manager",
    href: "/AdminDashboard/quotesAdmin",
    icon: Quote,
  },
  {
    label: "User Management",
    href: "/AdminDashboard/users",
    icon: Users,
  },
];

const marketingNavigation = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blog" },
  { label: "Post New Blog", href: "/blog/createblogs" },
  { label: "Admin Dashboard", href: "/AdminDashboard" },
];

const quickActions = [
  {
    label: "Draft New Blog",
    href: "/blog/createblogs",
    description: "Share fresh insights with the community",
    icon: Sparkles,
  },
  {
    label: "Review Quotes",
    href: "/AdminDashboard/quotesAdmin",
    description: "Curate motivational content for learners",
    icon: Quote,
  },
];

const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    label: "Blog published",
    detail: "“Understanding React Hooks” is now live",
    time: "2h ago",
    tone: "success",
    icon: FileText,
  },
  {
    id: "a2",
    label: "New mentor request",
    detail: "Mahesh Kale submitted onboarding details",
    time: "4h ago",
    tone: "info",
    icon: Users,
  },
  {
    id: "a3",
    label: "Quote scheduled",
    detail: "“Stay hungry, stay foolish.” goes live tomorrow",
    time: "1d ago",
    tone: "info",
    icon: Quote,
  },
  {
    id: "a4",
    label: "Community feedback",
    detail: "3 new comments awaiting review",
    time: "2d ago",
    tone: "warning",
    icon: MessageCircle,
  },
];

const insightSeed: ContentInsight[] = [
  {
    label: "Avg. reading time",
    value: "4m 12s",
    helper: "+1m vs last week",
  },
  {
    label: "Publish cadence",
    value: "3 posts/week",
    helper: "On target",
  },
  {
    label: "Engagement rate",
    value: "28%",
    helper: "+6% vs last month",
  },
];

const trendColorMap: Record<TrendTone, string> = {
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const buildStats = (
  userCount: number,
  blogCount: number,
  quoteCount: number,
): DashboardStat[] => [
  {
    label: "Total Users",
    value: userCount,
    change: "+12.4%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Published Blogs",
    value: blogCount,
    change: "+2 this week",
    trend: "up",
    icon: FileText,
  },
  {
    label: "Curated Quotes",
    value: quoteCount,
    change: "3 pending",
    trend: "neutral",
    icon: Quote,
  },
  {
    label: "Active Mentors",
    value: 7,
    change: "-1 this month",
    trend: "down",
    icon: ShieldCheck,
  },
];

const mutateInsights = (insights: ContentInsight[]): ContentInsight[] => {
  const randomDelta = () => (Math.random() > 0.5 ? "+" : "-");
  return insights.map((insight) => {
    if (insight.label === "Avg. reading time") {
      const minutes = 4 + Math.floor(Math.random() * 2);
      const seconds = 5 + Math.floor(Math.random() * 40);
      return {
        ...insight,
        value: `${minutes}m ${seconds.toString().padStart(2, "0")}s`,
        helper: `${randomDelta()}${Math.floor(Math.random() * 2) + 1}m vs last week`,
      };
    }
    if (insight.label === "Engagement rate") {
      const rate = 26 + Math.floor(Math.random() * 6);
      return {
        ...insight,
        value: `${rate}%`,
        helper: `${randomDelta()}${Math.floor(Math.random() * 4) + 1}% vs last month`,
      };
    }
    return insight;
  });
};

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<
    "loading" | "authorized" | "unauthorized"
  >("loading");

  const settingsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [quotes, setQuotes] = useState<QuoteBlog[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [insights, setInsights] = useState<ContentInsight[]>(insightSeed);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "admin@minimalisticlearning.com",
    password: "",
  });
  const [profileErrors, setProfileErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const adminName = useMemo(
    () => (profileForm.name ? profileForm.name.split(" ")[0] : "Admin"),
    [profileForm.name],
  );

  useEffect(() => {
    const typedUser = session?.user as { name?: string; email?: string; role?: string } | undefined;
    if (typedUser?.name || typedUser?.email) {
      setProfileForm((prev) => ({
        ...prev,
        name: typedUser.name ?? prev.name,
        email: typedUser.email ?? prev.email,
      }));
    }
  }, [session]);

  useEffect(() => {
    if (sessionStatus === "loading") {
      setAuthStatus("loading");
      return;
    }

    const typedUser = session?.user as { role?: string; email?: string } | undefined;
    const storedRole =
      typeof window !== "undefined"
        ? localStorage.getItem("ml-role") ??
          sessionStorage.getItem("ml-role")
        : null;

    const role = typedUser?.role ?? storedRole ?? "admin";
    const isAdmin =
      role?.toLowerCase() === "admin" ||
      ["admin@minimalisticlearning.com", "owner@minimalistictechnology.com"].includes(
        (typedUser?.email ?? "").toLowerCase(),
      );

    if (isAdmin) {
      setAuthStatus("authorized");
    } else {
      setAuthStatus("unauthorized");
      toast.error("Access restricted: admin role required");
      setTimeout(() => router.replace("/"), 2400);
    }
  }, [session, sessionStatus, router]);

  const refreshDashboard = useCallback(
    async (options: { silent?: boolean } = {}) => {
      setIsRefreshing(true);
      try {
        const response = await adminAPI.getDashboardStats();
        const { totals, latest } = response.data;
        
        setUserCount(totals.users);
        setStats(buildStats(totals.users, totals.blogs, totals.quotes));
        
        // Map blogs from API response
        const mappedBlogs: Blog[] = latest.blogs.map((blog: any) => ({
          _id: blog._id || blog.id,
          title: blog.title,
          description: blog.content?.substring(0, 100) || blog.description || "",
          date: blog.createdAt || blog.date,
          author: blog.author?.username || blog.author?.email || blog.author || "Unknown",
        }));
        setBlogs(mappedBlogs);
        
        // Map quotes from API response
        const mappedQuotes: QuoteBlog[] = latest.quotes.map((quote: any) => ({
          _id: quote._id || quote.id,
          quote: quote.text || quote.quote,
          name: quote.authorName || quote.name || "Unknown",
          title: quote.authorTitle || quote.title || "",
          createdAt: quote.createdAt || new Date().toISOString(),
        }));
        setQuotes(mappedQuotes);
        
        setInsights((prev) => mutateInsights(prev));
        setLastRefresh(new Date());
        setIsLoading(false);
        
        if (!options.silent) {
          toast.success("Dashboard metrics refreshed");
        }
      } catch (error: any) {
        console.error("Dashboard refresh error:", error);
        const errorMessage = error.response?.data?.message || "Unable to refresh dashboard metrics";
        if (!options.silent) {
          toast.error(errorMessage);
        }
        setIsLoading(false);
      } finally {
        setIsRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (authStatus === "authorized") {
      refreshDashboard({ silent: true });
      const interval = setInterval(() => refreshDashboard({ silent: true }), 60_000);
      return () => clearInterval(interval);
    }
  }, [authStatus, refreshDashboard]);
  
  // Fetch profile on mount
  useEffect(() => {
    if (authStatus === "authorized") {
      adminAPI.getProfile()
        .then((response) => {
          const user = response.data.user;
          setProfileForm((prev) => ({
            ...prev,
            name: user.username || prev.name,
            email: user.email || prev.email,
          }));
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    }
  }, [authStatus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileChange = (field: "name" | "email" | "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prev) => ({ ...prev, [field]: event.target.value }));
    setProfileErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateProfile = () => {
    const errors: typeof profileErrors = {};
    if (!profileForm.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!profileForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errors.email = "Please provide a valid email address.";
    }
    if (profileForm.password && profileForm.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateProfile()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setIsSavingProfile(true);
    try {
      const updateData: any = {
        username: profileForm.name,
        email: profileForm.email,
      };
      
      if (profileForm.password) {
        // Note: Backend requires currentPassword when updating password
        // You may need to add a currentPassword field to the form
        updateData.password = profileForm.password;
        // updateData.currentPassword = currentPassword; // Add this field if needed
      }
      
      const response = await adminAPI.updateProfile(updateData);
      toast.success("Profile information updated");
      setProfileForm((prev) => ({ ...prev, password: "" }));
      
      // Update form with response data
      if (response.data.user) {
        setProfileForm((prev) => ({
          ...prev,
          name: response.data.user.username || prev.name,
          email: response.data.user.email || prev.email,
        }));
      }
      
      setIsSettingsPanelOpen(false);
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
      
      // Set field-specific errors if available
      if (error.response?.data?.errors) {
        setProfileErrors(error.response.data.errors);
      }
    } finally {
      setIsSavingProfile(false);
    }
  };

  const renderLoading = () => (
    <div className="flex min-h-screen items-center justify-center bg-[#eff6ff] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[#2563eb] dark:text-blue-300" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Preparing admin workspace...
        </p>
      </div>
    </div>
  );

  const renderUnauthorized = () => (
    <div className="flex min-h-screen items-center justify-center bg-[#eff6ff] px-6 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
          Admin access required
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You need an administrator role to reach this dashboard. Contact an
          owner to request elevated permissions.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Return to home
        </Link>
      </div>
    </div>
  );

  if (authStatus === "loading" || isLoading) {
    return (
      <>
        <Toaster position="top-right" toastOptions={{ className: "text-sm font-medium" }} />
        {renderLoading()}
      </>
    );
  }

  if (authStatus === "unauthorized") {
    return (
      <>
        <Toaster position="top-right" toastOptions={{ className: "text-sm font-medium" }} />
        {renderUnauthorized()}
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: "text-sm font-medium" }} />
      <div className="relative min-h-screen overflow-hidden bg-[#eaf2ff] dark:bg-slate-950">
        <ScrollProgressBar />

        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-[#d0e1ff] blur-3xl dark:bg-blue-900/50" />
          <div className="absolute -right-16 top-40 h-64 w-64 rounded-full bg-[#c7d9ff] blur-3xl dark:bg-indigo-900/50" />
          <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#bfd7ff]/40 blur-3xl dark:bg-sky-900/30" />
        </div>

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="relative z-50 flex min-h-screen">
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200/80 bg-white/90 px-6 pb-8 pt-6 shadow-lg backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/80 md:relative md:translate-x-0 ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between pb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb] text-white shadow-md">
                  <span className="text-lg font-bold">ML</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                    Minimalistic Learning
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Admin Control
                  </h2>
                </div>
              </div>
            <div className="rounded-full bg-blue-100 p-2 text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-300">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-10 space-y-4 rounded-2xl bg-gradient-to-tr from-[#2563EB] via-indigo-500 to-sky-500 p-5 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                This week
              </p>
              <p className="text-sm font-semibold leading-5">
                “Learning happens fastest when creativity meets structure.”
              </p>
              <Link
                href="/AdminDashboard/quotesAdmin"
                className="inline-flex items-center text-xs font-medium uppercase tracking-wide hover:underline"
              >
                Curate quotes
              </Link>
            </div>

            <div className="mt-auto pt-8">
              <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                <span>Log out</span>
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </aside>

          <main className="flex-1 px-4 pb-16 pt-6 md:px-8 lg:px-12">
            <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-md backdrop-blur dark:border-slate-900 dark:bg-slate-900/80 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <button
                    type="button"
                    aria-label="Open sidebar"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-[#2563eb]">
                      Welcome back, {adminName}
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                      Your admin mission control
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Track growth, curate content, and keep the community inspired.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        Last refreshed:{" "}
                        <span className="font-semibold text-slate-700 dark:text-slate-100">
                          {lastRefresh.toLocaleTimeString()}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => refreshDashboard()}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-600"
                        disabled={isRefreshing}
                      >
                        {isRefreshing ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-3 w-3" />
                            Refresh now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-300">
                  {marketingNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative flex h-11 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:w-96">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search blogs, quotes, or users..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
                    aria-label="Search site content"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                      3
                    </span>
                  </button>
                  <div className="relative" ref={settingsRef}>
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen((prev) => !prev)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      aria-haspopup="menu"
                      aria-expanded={isSettingsOpen}
                      aria-label="Open admin menu"
                    >
                      <Settings className="h-5 w-5" />
                    </button>
                    {isSettingsOpen && (
                      <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Admin menu
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
                            {profileForm.name}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            {profileForm.email}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          onClick={() => {
                            setIsSettingsPanelOpen(true);
                            setIsSettingsOpen(false);
                          }}
                        >
                          Admin preferences
                        </button>
                        <Link
                          href="/AdminDashboard/blogsAdmin"
                          className="block px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          onClick={() => setIsSettingsOpen(false)}
                        >
                          Blog library
                        </Link>
                        <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                          <div className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-200">
                            <span>Theme</span>
                            <ThemeToggle />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <section className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const TrendIcon =
                  stat.trend === "up"
                    ? ArrowUpRight
                    : stat.trend === "down"
                    ? ArrowDownRight
                    : null;
                const changeBadgeClasses =
                  stat.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    : stat.trend === "down"
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-300"
                    : "bg-slate-500/10 text-slate-600 dark:text-slate-300";
                return (
                  <div
                    key={stat.label}
                    className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="absolute -right-6 top-4 h-20 w-20 rounded-full bg-[#2563eb]/10 blur-xl" />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {stat.label}
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                          {stat.value}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#2563eb]/10 p-3 text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {TrendIcon ? (
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${changeBadgeClasses}`}
                        >
                          <TrendIcon className="mr-1 h-3.5 w-3.5" />
                          {stat.change}
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${changeBadgeClasses}`}
                        >
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="mb-12 grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Latest blog activity
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Keep tabs on fresh knowledge being shared with learners.
                      </p>
                    </div>
                    <Link
                      href="/AdminDashboard/blogsAdmin"
                      className="inline-flex items-center gap-1 rounded-full border border-blue-100 px-4 py-2 text-sm font-semibold text-[#2563eb] transition hover:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-blue-500/10"
                    >
                      Manage blogs
                    </Link>
                  </div>
                  <div className="mt-6 space-y-4">
                    {blogs.slice(0, 5).map((blog) => (
                      <article
                        key={blog._id}
                        className="group flex items-start justify-between rounded-2xl border border-slate-200/70 bg-white/80 p-4 transition hover:border-[#2563eb]/40 hover:bg-blue-50/40 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-blue-900 dark:hover:bg-blue-900/20"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#2563eb] dark:text-slate-100 dark:group-hover:text-blue-300">
                            {blog.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                            {blog.description}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                              <CalendarClock className="h-3.5 w-3.5" />
                              {formatDate(blog.date)}
                            </span>
                            <span className="rounded-full bg-blue-100 px-2.5 py-1 font-medium text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-300">
                              {blog.author || "Unknown author"}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${blog._id}`}
                        className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-[#2563eb]/40 hover:text-[#2563eb] dark:border-slate-800 dark:text-slate-500 dark:hover:border-blue-900 dark:hover:text-blue-300"
                          aria-label={`Open ${blog.title}`}
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Content insights
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Rolling 7 days
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {insights.map((insight) => (
                      <div
                        key={insight.label}
                        className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2563eb]/30 dark:border-slate-800 dark:bg-slate-900/70"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {insight.label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {insight.value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#2563eb] dark:text-blue-300">
                          {insight.helper}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      User management snapshot
                    </h2>
                    <Link
                      href="/admin/users"
                      className="inline-flex items-center gap-1 rounded-full border border-blue-100 px-4 py-2 text-sm font-semibold text-[#2563eb] transition hover:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-blue-500/10"
                    >
                      Manage users
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "New signups", value: "12 this week" },
                      { label: "Pending approvals", value: "4 mentors" },
                      { label: "Flagged accounts", value: "0 outstanding" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Quick actions
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Productivity
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 transition hover:border-[#2563eb]/40 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-900 dark:hover:bg-blue-900/20"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-300">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {action.label}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              {action.description}
                            </p>
                          </div>
                          <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Activity timeline
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Recent
                    </span>
                  </div>
                  <div className="mt-6 space-y-5">
                    {activityFeed.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex gap-3">
                          <span
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold ${trendColorMap[activity.tone]}`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {activity.label}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {activity.detail}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-[#2563EB] via-indigo-500 to-sky-500 p-6 text-white shadow-lg backdrop-blur">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Motivational spotlight</h2>
                      <p className="mt-1 text-sm text-white/80">
                        Keep learners inspired with curated wisdom.
                      </p>
                    </div>
                    <Quote className="h-8 w-8 opacity-60" />
                  </div>
                  <div className="mt-6 space-y-4">
                    {quotes.slice(0, 5).map((quote) => (
                      <blockquote
                        key={quote._id}
                        className="rounded-2xl bg-white/10 p-4 text-sm font-medium leading-relaxed text-white/90 backdrop-blur"
                      >
                        “{quote.quote}”
                        <footer className="mt-2 text-xs text-white/70">
                          — {quote.name}, {quote.title}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  <Link
                    href="/AdminDashboard/quotesAdmin"
                    className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    View quote library
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>

        {isSettingsPanelOpen && (
          <>
            <div
              className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setIsSettingsPanelOpen(false)}
            />
            <aside className="fixed right-0 top-0 z-[70] h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                    Admin preferences
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Update profile
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Keep your contact details up to date for admin alerts.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => setIsSettingsPanelOpen(false)}
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleProfileSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="admin-name"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Display name
                  </label>
                  <input
                    id="admin-name"
                    type="text"
                    value={profileForm.name}
                    onChange={handleProfileChange("name")}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:bg-slate-900 ${
                      profileErrors.name
                        ? "border-rose-400 focus:ring-rose-400"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {profileErrors.name && (
                    <p className="mt-1 text-xs font-medium text-rose-500" role="alert">
                      {profileErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Admin email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange("email")}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:bg-slate-900 ${
                      profileErrors.email
                        ? "border-rose-400 focus:ring-rose-400"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {profileErrors.email && (
                    <p className="mt-1 text-xs font-medium text-rose-500" role="alert">
                      {profileErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Reset password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={profileForm.password}
                    onChange={handleProfileChange("password")}
                    placeholder="Leave blank to keep current password"
                    className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:bg-slate-900 ${
                      profileErrors.password
                        ? "border-rose-400 focus:ring-rose-400"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {profileErrors.password && (
                    <p className="mt-1 text-xs font-medium text-rose-500" role="alert">
                      {profileErrors.password}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Display
                  </p>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-white/80 px-4 py-3 shadow-sm dark:bg-slate-900/80">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Theme preference
                      </p>
                      <p className="text-xs text-slate-400">
                        Switch between light and dark modes instantly.
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSavingProfile}
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </form>
            </aside>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;