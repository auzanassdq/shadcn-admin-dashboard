import { Sidebar } from "@/components/sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " dark"} suppressHydrationWarning={true}>
        <div className="flex justify-between">
          <Sidebar className="hidden lg:block" />
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
