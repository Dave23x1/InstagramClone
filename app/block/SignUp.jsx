"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use correct import for App Router
import Link from "next/link";
import Image from "next/image";

const signinUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://instagram-clone-fawn-pi.vercel.app/";

export default function SignUp() {
  const router = useRouter(); // ✅ Correct way to handle navigation in App Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !fullname || !username) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullname, username }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully!");
        router.push("/"); // ✅ Redirect to login page after successful signup
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-[20px]">
      <div className="flex flex-col gap-y-[20px]">
        <div className="border border-gray-600 w-[350px] px-[40px] text-center pb-[20px]">
          <div className="flex justify-center">
            <Image
              src="/images/instagram.png"
              width={175}
              height={51}
              alt="Instagram"
              className="pt-[50px]"
            />
          </div>
          <div>
            <h2 className="text-gray-400 font-semibold text-[16px]">
              Sign up to see photos and videos from your friends.
            </h2>
          </div>
          <Link href="#">
            <div className="pt-[20px] flex gap-[10px] justify-center items-center">
              <Image
                src="/images/Facebookic.png"
                width={20}
                height={20}
                alt="facebook"
              />
              <p className="font-semibold text-blue-500">
                Log in with Facebook
              </p>
            </div>
          </Link>
          <div className="flex items-center pt-[20px]">
            <hr className="flex-grow border-t-2 border-gray-600" />
            <span className="mx-4 text-gray-400 font-semibold">OR</span>
            <hr className="flex-grow border-t-2 border-gray-600" />
          </div>
          <form
            className="flex gap-y-2 flex-col pt-[30px]"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="sr-only">
              Phone number, username, or email
            </label>
            <input
              type="email"
              id="email"
              className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
              placeholder="Mobile Number or Email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              id="fullname"
              className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <input
              type="text"
              id="username"
              className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="pt-[20px]">
              <button
                type="submit"
                className="bg-[#0168AD] w-full rounded-lg py-1 font-semibold text-gray-300"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-gray-400 text-[12px] pt-[12px]">
              People who use our service may have uploaded your contact
              information to Instagram.
              <Link href="https://www.facebook.com/help/instagram/261704639352628">
                <span className="text-white text-[12px]"> Learn More</span>
              </Link>
            </p>
            <p className="text-gray-400 text-[12px] pt-[12px]">
              By signing up, you agree to our{" "}
              <span className="text-white">Terms</span>,{" "}
              <span className="text-white">Privacy Policy</span>, and{" "}
              <span className="text-white">Cookies Policy</span>.
            </p>
          </div>
        </div>
        <div className="border border-gray-600 w-[350px] flex justify-center py-[20px]">
          <p>
            Have an account?
            <Link href={signinUrl}>
              <span className="text-blue-500 font-semibold"> Log in</span>
            </Link>
          </p>
        </div>
        <p className="text-center">Get the app.</p>
        <div className="flex gap-[10px] justify-center">
          <Link href="https://apps.apple.com/us/app/instagram/id389801252">
            <Image
              src="/images/Appstore.png"
              width={130}
              height={130}
              alt="Appstore"
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.instagram.android">
            <Image
              src="/images/Googlestore.png"
              width={130}
              height={130}
              alt="GooglePlay"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
