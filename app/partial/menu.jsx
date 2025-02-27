"use client";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  Explore,
  Message,
  Notification,
  Create,
  Threads,
  More,
  Settings,
  Activity,
  Saved,
  Appearance,
  Reports,
} from "@/app/icons/Icons.jsx";

export default function Menu({ setIsAuthenticated }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { authToken: token } = parseCookies();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        destroyCookie(null, "authToken");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("authChange"));
        router.push("/");
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    if (!token) return;

    const decoded = jwt.decode(token);
    if (!decoded?.username) return console.error("Invalid token");

    fetch(`/api/user/${decoded.username}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("User not found")))
      .then(setUser)
      .catch(console.error);
  }, [token]);

  return (
    <nav className="p-4  border border-l-0 border-r-[#262727] border-t-0 border-b-0 text-white w-[270px] h-[calc(100vh)] fixed z-[20] ">
      <div className="py-4 ">
        <Image
          src="/images/instagram.png"
          width={120}
          height={140}
          alt="Logo"
        />
        <div className="pt-[40px]">
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2">
            <HomeIcon />
            <div className="">
              <span className="font-semibold">Home</span>
            </div>
          </div>
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 cursor-pointer ">
            <SearchIcon />
            <div className="">
              <span className="font-semibold">Search</span>
            </div>
          </div>
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 ">
            <Explore />
            <div className="">
              <span className="font-semibold">Explore</span>
            </div>
          </div>
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 ">
            <Message />
            <div className="">
              <span className="font-semibold">Messages</span>
            </div>
          </div>
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 ">
            <Notification />
            <div className="">
              <span className="font-semibold">Notification</span>
            </div>
          </div>
          <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 ">
            <Create />
            <div className="">
              <span className="font-semibold">Create</span>
            </div>
          </div>
          {user ? (
            <Link href={`/${user.username}`}>
              <div className="flex gap-2   hover:bg-[#363737] rounded-md px-2  py-4">
                <Image
                  src={user.profile || "/default-avatar.png"}
                  width={23}
                  height={23}
                  alt="Profile"
                  className="rounded-full border border-white "
                />
                <span className="font-semibold">Profile</span>
              </div>
            </Link>
          ) : (
            <p>User not found.</p>
          )}
          <div className="pt-[320px]">
            <div className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 ">
              <Threads />
              <span className="font-semibold">Threads</span>
            </div>
            <div className="relative">
              {/* More Button */}
              <div
                className="flex gap-2 py-4 hover:bg-[#363737] rounded-md px-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <More />
                <span className="font-semibold">More</span>
              </div>

              {/* Drop-Up Menu */}
              {isOpen && (
                <div className="absolute  bottom-full mb-2 w-[290px] bg-[#262727] text-white rounded-2xl shadow-lg z-50">
                  <ul className="py-2 px-2 border-b-[7px] border-[#353434] border-t-0 border-r-0 border-l-0">
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      <Settings />
                      Settings
                    </li>
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      <Activity />
                      Your activity
                    </li>
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      <Saved />
                      Saved
                    </li>
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      <Appearance />
                      Switch appearance
                    </li>
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      <Reports />
                      Report a problem
                    </li>
                  </ul>
                  <ul className="py-2 px-2">
                    <li className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md">
                      Switch accounts
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-4  cursor-pointer hover:bg-[#3f4141] flex gap-2 rounded-md"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
