// "use client";

// import Link from 'next/link';
// import { Eye, EyeOff } from 'lucide-react'; // 👈 Import icons

// const CORRECT_OTP = "1234"; // Simulated correct OTP

// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstNameError, setFirstNameError] = useState('');
//   const [lastNameError, setLastNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [contactError, setContactError] = useState('');

//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [otpError, setOtpError] = useState('');
//   const [isVerified, setIsVerified] = useState(false);
//   const otpRefs = useRef<HTMLInputElement[]>([]);

//   const validateFirstName = (value: string) => {
//     if (!/^[A-Za-z]+$/.test(value)) {
//       setFirstNameError('First name should only contain letters.');
//     } else {
//       setFirstNameError('');
//     }
//     setFirstName(value);
//   };

//   const validateLastName = (value: string) => {
//     if (!/^[A-Za-z]+$/.test(value)) {
//       setLastNameError('Last name should only contain letters.');
//     } else {
//       setLastNameError('');
//     }
//     setLastName(value);
//   };

//   const validateEmail = (value: string) => {
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       setEmailError('Please enter a valid email address.');
//     } else {
//       setEmailError('');
//     }
//     setEmail(value);
//   };

//   const validateContact = (value: string) => {
//     if (!/^\d+$/.test(value)) {
//       setContactError('Contact number should only contain numbers.');
//     } else {
//       setContactError('');
//     }
//     setContact(value);
//   };

//   const handleSignUp = () => {
//     if (!firstNameError && !lastNameError && !emailError && !contactError) {
//       setIsOtpSent(true); // Simulate sending OTP
//     } else {
//       alert('Please fix the errors before signing up.');
//     }
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       setOtpError('');
//       if (value && index < 3) {
//         otpRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleOtpSubmit = () => {
//     if (otp.join('') === CORRECT_OTP) {
//       setIsVerified(true);
//       setOtpError('');
//     } else {
//       setOtpError('Incorrect OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#daf0ff] p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300">
//         {!isOtpSent ? (
//           <>
//             <div className="bg-blue-500 p-6 text-white">
//               <h1 className="text-3xl font-bold text-center">Create Account</h1>
//               <p className="text-center text-blue-100 mt-1">Join our community today</p>
//             </div>
//             <div className="p-8 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={firstName}
//                     onChange={(e) => validateFirstName(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                   {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={lastName}
//                     onChange={(e) => validateLastName(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                   {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
//                 <input
//                   type="tel"
//                   required
//                   value={contact}
//                   onChange={(e) => validateContact(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => validateEmail(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 onClick={handleSignUp}
//                 className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
//               >
//                 Create Account
//               </button>
//               <div className="text-center mt-6">
//                 <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Log In</Link>
//               </div>
//             </div>
//           </>
//         ) : !isVerified ? (
//           <div className="p-8 text-center">
//             <h2 className="text-xl font-semibold mb-4">Enter the OTP sent to your email</h2>
//             <div className="flex justify-center gap-3 mb-4">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (otpRefs.current[index] = el!)}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                   className="w-12 h-12 text-xl text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ))}
//             </div>
//             <button
//               onClick={handleOtpSubmit}
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Verify OTP
//             </button>
//             {otpError && <p className="text-red-500 mt-3">{otpError}</p>}
//           </div>
//         ) : (
//           <div className="p-8 text-center">
//             <h2 className="text-green-600 text-xl font-bold mb-2">✅ Account Verified!</h2>
//             <p className="text-gray-700">Thank you for signing up. You can now <Link href="/logIn" className="text-blue-600 underline">Log In</Link>.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import api from "utils/api"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Initial form, 2: OTP verification

  const validateFirstName = (value: string) => {
    if (!value) {
      setFirstNameError("First name is required.");
    } else if (!/^[A-Za-z]+$/.test(value)) {
      setFirstNameError("First name should only contain letters.");
    } else {
      setFirstNameError("");
    }
    setFirstName(value);
  };

  const validateLastName = (value: string) => {
    if (!value) {
      setLastNameError("Last name is required.");
    } else if (!/^[A-Za-z]+$/.test(value)) {
      setLastNameError("Last name should only contain letters.");
    } else {
      setLastNameError("");
    }
    setLastName(value);
  };

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const validateContact = (value: string) => {
    if (!value) {
      setContactError("Contact number is required.");
    } else if (!/^\d+$/.test(value)) {
      setContactError("Contact number should only contain numbers.");
    } else {
      setContactError("");
    }
    setContact(value);
  };

  const validatePassword = (value: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

    if (!value) {
      setError("Password is required.");
    } else if (!strongPasswordRegex.test(value)) {
      setError(
        "Password must be at least 12 characters and include uppercase, lowercase, number, and special character."
      );
    } else {
      setError("");
    }
    setPassword(value);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !contactError &&
      !error &&
      firstName &&
      lastName &&
      email &&
      contact &&
      password
    ) {
      try {
        // First, attempt signup
        await api.post("/auth/signup", {
          username: `${firstName} ${lastName}`,
          email,
          password,
        });
        console.log("Signup successful");
        toast.success(
          "Account created successfully! Please check your email for the OTP."
        );
        // If signup is successful, send OTP
        try {
          await api.post("/api/otp/send-otp", {
            name: `${firstName} ${lastName}`,
            email,
          });
          toast.success("OTP sent to your email!");
          setError("");
          setStep(2);
        } catch (otpErr: any) {
          setError(otpErr.response?.data?.message || "Failed to send OTP");
          toast.error(otpErr.response?.data?.message || "Failed to send OTP");
        }
      } catch (err: any) {
        if (err.response?.status === 400) {
          toast.error(
            err.response?.data?.error || "User already exists, please log in"
          );
          router.push("/login");
        } else {
          setError(err.response?.data?.error || "Failed to create account");
          toast.error(err.response?.data?.error || "Failed to create account");
        }
      }
    } else {
      toast.error(
        "Please fix the errors and complete all fields before proceeding."
      );
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required.");
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      // Verify OTP
      //await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Invalid OTP"
      );
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Invalid OTP"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-3xl font-bold text-center text-white">
            {step === 1 ? "Create Account" : "Verify OTP"}
          </h1>
          <p className="text-center text-blue-100 mt-1">
            {step === 1
              ? "Join our community today"
              : "Enter the OTP sent to your email"}
          </p>
        </div>
        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => validateFirstName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                  />
                  {firstNameError && (
                    <p className="text-red-500 text-sm mt-1">
                      {firstNameError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => validateLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                  />
                  {lastNameError && (
                    <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => validateContact(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                />
                {contactError && (
                  <p className="text-red-500 text-sm mt-1">{contactError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                  placeholder="Enter OTP"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
              >
                Verify OTP
              </button>
            </form>
          )}
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:text-blue-700 transition"
            >
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
