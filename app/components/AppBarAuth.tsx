"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const AppBarAuth = () => {
  const session = useSession();

  return !session?.data?.user ? (
    <>
      <Link
        href="/auth"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        href="/logIn"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
      >
        Sign In
      </Link>
    </>
  ) : (
    <Button
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Log Out
    </Button>
  );
};
