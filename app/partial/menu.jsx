"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <nav className="p-4  border border-l-0 border-r-[#262727] border-t-[#262727] border-b-[#262727] text-white w-[270px] h-[calc(100vh)] fixed  ">
      <div className="pt-[40px]">
        <Image
          src="/images/instagram.png"
          width={120}
          height={140}
          alt="Logo"
        />
        <svg
          aria-label="Home"
          class="x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Home</title>
          <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
        </svg>
      </div>

      {/* <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button> */}
    </nav>
  );
}
