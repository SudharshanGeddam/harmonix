/**
 * Root Layout Component
 * 
 * Global layout wrapper for the EthicTrack dashboard application.
 * Provides consistent navigation structure across all pages.
 * 
 * Structure:
 * - Fixed sidebar (256px) with main navigation
 * - Sticky top navbar with search and user actions
 * - Main content area with responsive padding
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EthicTrack - Dashboard",
  description: "Track packages and ethical receipts with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex flex-1 flex-col pl-64">
            {/* Top navbar */}
            <Navbar />

            {/* Page content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
