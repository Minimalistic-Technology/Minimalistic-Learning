import {
  GooglelogInButton,
} from "../components/authButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { CredentialsForm } from "../components/CredentialsForm";

const LoginPage = async () => {
    const session = await getServerSession(authOptions);

    console.log("Session: ", session);
  
    if (session) return redirect("/dashboard");

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-0 bg-blue-100">
    <div className="flex flex-col items-center p-10 shadow-2xl rounded-md bg-white">
      <h1 className="mt-5 mb-4 text-4xl font-bold text-blue-800">Sign In</h1>
      <CredentialsForm />
      <span className="text-2xl font-semibold text-slate-900 text-center mt-4">
        Or
      </span>
      <GooglelogInButton />
      {/* <GithublogInButton /> */}
      {/* <CredentialslogInButton /> */}
    </div>
  </div>
  );
};

export default LoginPage;