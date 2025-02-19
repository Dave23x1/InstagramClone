"use client";

import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-lg font-semibold">Menu</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
