"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import Menu from "./partial/menu";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./partial/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded?.username) {
          setIsAuthenticated(true);
          return;
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();

    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAuthenticated && <Menu setIsAuthenticated={setIsAuthenticated} />}

        {children}
        <div className="pt-[40px]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
