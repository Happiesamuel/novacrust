"use client";
import { Button } from "@/components/ui/button";
import { handleCopy } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCopy } from "react-icons/bs";

export default function Page() {
  const router = useRouter();
  function handleClick() {
    localStorage.clear();
    router.push("/");
  }
  return (
    <div className="">
      <div className="relative w-44 mx-auto h-6 aspect-video">
        <Image src={"/logo.png"} alt="logo" fill />
      </div>
      <div className=" flex flex-col items-center mt-24 justify-center ">
        <Image src={"/success.png"} width={80} height={80} alt="logo" />
        <div className="space-y-2 text-center mt-8">
          <p className="text-2xl font-medium text-[#000E10]">
            Your transaction is processing.
          </p>
          <p className="text-xl  text-grey-200">
            The recipient will receive it shortly.
          </p>
        </div>
        <div className="bg-[#F7F7F7] px-6 py-4 rounded-[10px] w-full space-y-6 mt-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-grey-200 ">Transaction ID</p>
            <div className="flex items-center gap-2">
              <p className="text-base text-primary ">NC123456789</p>
              <BsCopy
                onClick={() => handleCopy("NC123456789")}
                className="text-primary text-xl cursor-pointer"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleClick}
          className="
    bg-white
  text-primary
    rounded-full
    py-5 font-bold text-base
    px-10 w-full
    max-w-[80%]
    cursor-pointer mt-8 hover:bg-transparent
  "
        >
          Go back to home
        </Button>
      </div>
    </div>
  );
}
