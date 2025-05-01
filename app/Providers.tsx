"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
// import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <RecoilRoot>{children}</RecoilRoot>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};
