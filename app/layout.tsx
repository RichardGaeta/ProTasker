import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProTasker",
  description: "Task Manager for Intentional Thinkers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-full flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
