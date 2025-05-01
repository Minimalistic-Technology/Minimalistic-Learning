import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./Providers";
import { cn } from "./lib/utils";
import NextTopLoader from 'nextjs-toploader';
import OfflineNotification from "./components/OfflineNavigator";

export const metadata: Metadata = {
  title: "Minimalistic Learning",
  description: "Minimalistic Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        'min-h-screen bg-[#daf0ff] dark:bg-gray-950',
        'antialiased',
        // Prevent content shift
        '[&_.theme-toggle-wrapper]:opacity-0 [&_.theme-toggle-wrapper]:animate-fade-in'
      )}
    >
       <NextTopLoader
          showSpinner={false}
        />
      <Providers>
        <Navbar />
        <OfflineNotification />
        <main>{children}</main>
      </Providers>
    </body>
  </html>
  );
}
