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
import { AuthProvider } from "@/lib/AuthProvider";
import { NotificationProvider } from "@/lib/NotificationContext";
import LayoutContent from "@/lib/LayoutContent";

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
        <AuthProvider>
          <NotificationProvider>
            <LayoutContent>{children}</LayoutContent>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
