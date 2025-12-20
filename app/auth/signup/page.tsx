"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  validateEmail,
  validatePassword,
  validateContactNumber,
  validateName,
} from "@/app/lib/validation";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const API_BASE_URL = "http://localhost:5000/api/v1";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    const firstNameValidation = validateName(formData.firstName, "First name");
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error;
    }

    const lastNameValidation = validateName(formData.lastName, "Last name");
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error;
    }

    const contactValidation = validateContactNumber(formData.contactNumber);
    if (!contactValidation.isValid) {
      newErrors.contactNumber = contactValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof data?.message === "string"
            ? data.message
            : "Signup failed. Please try again.";
        toast.error(message);
        return;
      }

      toast.success("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Unable to reach the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/20 px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-lg p-2 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <ThemeToggle />
        </div>
      </div>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-sky-400/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <div className="w-full max-w-2xl relative z-10 max-h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-200/50 ring-2 ring-blue-500/20 overflow-hidden dark:bg-slate-900/95 dark:border-blue-700/50 my-4">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-6 sm:px-8 sm:py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/30 backdrop-blur-sm rounded-full mb-2 sm:mb-3 relative z-10 ring-2 ring-white/50">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Create Your Account
            </h2>
            <p className="text-blue-100 text-sm">
              Join us and start your learning journey
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 ${
                        errors.firstName
                          ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-400`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 ${
                        errors.lastName
                          ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-400`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.contactNumber
                        ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-400`}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-400`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-12 py-2.5 border rounded-lg transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-400`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 flex items-start">
                  <svg
                    className="w-3.5 h-3.5 mr-1 mt-0.5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Min 8 characters, 1 uppercase, 1 number, 1 special character
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/50 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 hover:shadow-xl hover:shadow-blue-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}