"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
// API integration removed
import { toast } from "react-hot-toast";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Shield,
  Trash2,
  Edit2,
  RefreshCcw,
} from "lucide-react";
import { format } from "date-fns";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  blogsCount: number;
}

const mockUsers: User[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15T10:00:00Z",
    lastActive: "2024-10-25T14:30:00Z",
    blogsCount: 12,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-20T09:00:00Z",
    lastActive: "2024-10-25T12:00:00Z",
    blogsCount: 8,
  },
  {
    _id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2024-03-10T11:00:00Z",
    lastActive: "2024-10-24T16:45:00Z",
    blogsCount: 15,
  },
  {
    _id: "4",
    name: "Emily White",
    email: "emily@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2024-04-05T08:00:00Z",
    lastActive: "2024-10-20T10:00:00Z",
    blogsCount: 3,
  },
  {
    _id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "suspended",
    joinDate: "2024-05-12T13:00:00Z",
    lastActive: "2024-10-18T09:00:00Z",
    blogsCount: 0,
  },
];

type RoleFilter = "all" | "admin" | "user" | "moderator";
type StatusFilter = "all" | "active" | "inactive" | "suspended";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load mock users
  useEffect(() => {
    const loadUsers = () => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setUsers(mockUsers);
        setIsLoading(false);
      }, 500);
    };

    loadUsers();
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const admins = users.filter((u) => u.role === "admin").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    return { total, active, admins, suspended };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !searchTerm.trim() ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    // Note: Backend doesn't have delete user endpoint, so this is a placeholder
    toast.error("User deletion is not available via API");
  };

  const handleStatusChange = async (id: string, newStatus: User["status"]) => {
    // Simulate API call
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
      toast.success(`User status updated to ${newStatus}`);
    }, 300);
  };

  const handleRoleChange = async (id: string, newRole: User["role"]) => {
    // Simulate API call
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      toast.success(`User role updated to ${newRole}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/50 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 pb-16">
      {/* <ScrollProgressBar /> */}

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pt-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/95 px-8 py-10 shadow-2xl backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 via-sky-200/20 to-transparent blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <Users className="h-4 w-4 text-[#2563eb]" />
                User Management
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
                Manage community members & permissions.
              </h1>
              <p className="max-w-2xl text-sm text-slate-500">
                View, edit, and moderate all user accounts. Assign roles and manage
                access levels across the platform. (For your own profile, visit{" "}
                <Link href="/AdminDashboard/user" className="text-[#2563eb] hover:underline font-semibold">
                  My Profile
                </Link>
                )
              </p>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:w-auto">
              {[
                {
                  label: "Total Users",
                  value: stats.total,
                  accent: "from-slate-900 to-slate-700",
                  icon: Users,
                },
                {
                  label: "Active",
                  value: stats.active,
                  accent: "from-emerald-500 to-emerald-600",
                  icon: UserCheck,
                },
                {
                  label: "Admins",
                  value: stats.admins,
                  accent: "from-[#2563eb] to-indigo-500",
                  icon: Shield,
                },
                {
                  label: "Suspended",
                  value: stats.suspended,
                  accent: "from-rose-500 to-rose-600",
                  icon: UserX,
                },
              ].map(({ label, value, accent, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur"
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
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563eb]/10 text-[#2563eb]">
                <Filter className="h-4 w-4" />
              </span>
              Filter & Search
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-500 shadow-sm">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:text-[#2563eb]"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/60">
            {filteredUsers.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No users found matching your filters.
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-white/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Blogs
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white/50 transition hover:bg-white/80"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-indigo-500 text-sm font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {user.name}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value as User["role"])
                          }
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(
                              user._id,
                              e.target.value as User["status"]
                            )
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 ${
                            user.status === "active"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : user.status === "suspended"
                              ? "border-rose-200 bg-rose-50 text-rose-700"
                              : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                        {user.blogsCount}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {format(new Date(user.joinDate), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setSelectedUser(
                                selectedUser === user._id ? null : user._id
                              )
                            }
                            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {selectedUser === user._id && (
                            <div className="absolute right-0 top-10 z-10 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                              <button
                                onClick={() => {
                                  handleDelete(user._id);
                                  setSelectedUser(null);
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

