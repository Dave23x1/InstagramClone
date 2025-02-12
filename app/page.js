import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <section className="flex justify-center w-full">
      <div className="container">
        <div className="flex flex-col justify-center items-center h-screen w-full gap-y-[20px]">
          <div className=" border border-gray-600 w-[350px] px-[40px] text-center pb-[20px] ">
            <div className=" flex justify-center">
              <Image
                src="/images/instagram.png"
                width={175}
                height={51}
                alt="title"
                className="pt-[50px] "
              />
            </div>

            <form className="flex gap-y-2 flex-col pt-[30px]">
              <input
                className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
                placeholder="Phone number, username, or email"
              ></input>
              <input
                className="h-[34px] bg-[#121313] rounded-[3px] border-gray-600 border px-2 text-[13px]"
                placeholder="Password"
              ></input>
            </form>
            <div className="pt-[20px]">
              <button className="bg-[#0168AD] w-full rounded-lg py-1 font-semibold  text-gray-300">
                Log in
              </button>
            </div>
            <div className="flex items-center pt-[20px]">
              <hr className="flex-grow border-t-2 border-gray-600" />
              <span className="mx-4 text-gray-400 font-semibold">OR</span>
              <hr className="flex-grow border-t-2 border-gray-600" />
            </div>
            <Link href="#">
              <div className="pt-[20px] flex gap-[10px] justify-center items-center">
                <div>
                  <Image
                    src="/images/Facebookic.png"
                    width={20}
                    height={20}
                    alt="facebook"
                  />
                </div>
                <p className="font-semibold text-blue-500 ">
                  Log in with Facebook
                </p>
              </div>
            </Link>
            <p className="pt-[20px]">Forgot password?</p>
          </div>
          <div className="border border-gray-600  w-[350px]  flex justify-center py-[20px]">
            <p>
              Don't have an account?
              <Link href="#">
                <span className="text-blue-500 font-semibold"> Sign up</span>
              </Link>
            </p>
          </div>
          <p>Get the app.</p>
          <div className="flex gap-[10px]">
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
