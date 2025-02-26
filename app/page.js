"use client";

import Image from "next/image";
import Link from "next/link";
import Phone from "./block/phoneSlide.jsx";
import Login from "./block/Login.jsx";
import { signIn } from "next-auth/react";

const signupUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/accounts/emailsignup"
    : "https://instagram-clone-fawn-pi.vercel.app//accounts/emailsignup";

export default function Home() {
  return (
    <section className="w-full">
      <div className="flex justify-center items-center pt-[140px]">
        <div className="relative hidden lg:flex">
          <div className="absolute ">
            <Phone />
          </div>
          <Image
            src="/images/phoneinsta.png"
            width={490}
            height={600}
            alt="Phone"
            priority
          />
        </div>

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
            <Login />

            <div className="flex items-center pt-[20px]">
              <hr className="flex-grow border-t-2 border-gray-600" />
              <span className="mx-4 text-gray-400 font-semibold">OR</span>
              <hr className="flex-grow border-t-2 border-gray-600" />
            </div>
            <button onClick={() => signIn("facebook")}>
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
            </button>
            <p className="pt-[20px]">Forgot password?</p>
          </div>

          <div className="border border-gray-600 w-[350px] flex justify-center py-[20px]">
            <p>
              Don't have an account?
              <Link href={signupUrl}>
                <span className="text-blue-500 font-semibold"> Sign up</span>
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
    </section>
  );
}
