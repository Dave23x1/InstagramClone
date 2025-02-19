"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      alert(data.message);
      window.location.href = "/dashboard";
    } else {
      setError(data.message);
    }
  };

  return (
    <form className="flex gap-y-2 flex-col pt-[30px]" onSubmit={handleSubmit}>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
        placeholder="Phone number, username, or email"
        aria-label="Phone number, username, or email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="pt-[20px]">
        <button
          type="submit"
          className="bg-[#0168AD] w-full rounded-lg py-1 font-semibold text-gray-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </div>
    </form>
  );
}
