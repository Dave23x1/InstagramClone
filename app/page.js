import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full container h-full">
      <div className="">
        <div className=" border border-gray-400 w-[350px] px-[40px] text-center  ">
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
            <input className="h-[34px] bg-[#121313] rounded-[3px] "></input>
            <input className="h-[34px] bg-[#121313] rounded-[3px]"></input>
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
        </div>
      </div>
    </section>
  );
}
