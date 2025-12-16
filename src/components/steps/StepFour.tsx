import { BsCopy } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleCopy } from "@/lib/utils";
export default function StepFour() {
  const item = localStorage.getItem("step-one")
    ? JSON.parse(localStorage.getItem("step-one")!)
    : {};
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="rounded-full px-4 py-2 w-fit flex items-center gap-2 bg-button-text border border-sky">
        <p className="text-base font-medium text-primary">
          4LiV4YjbxsL6739MKghUd
        </p>
        <BsCopy
          onClick={() => handleCopy("4LiV4YjbxsL6739MKghUd")}
          className="text-primary text-xl cursor-pointer"
        />
      </div>
      <div className="bg-[#F7F7F7] px-6 py-4 rounded-[10px] w-full space-y-6 mt-16">
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Amount to send</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-grey-200 ">
              {item.payAmount} {item.payChain.toUpperCase()}
            </p>
            <BsCopy
              onClick={() =>
                handleCopy(` ${item.payAmount} ${item.payChain.toUpperCase()}`)
              }
              className="text-primary text-xl cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Network</p>
          <p className="text-sm text-grey-200 ">ETH</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Wallet</p>
          <p className="text-sm text-grey-200 ">{item.payTo.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-start gap-2 w-full mt-5">
        <IoInformationCircleOutline className="text-primary text-2xl" />
        <p className="text-sm text-grey-200">
          Only send {"USDT"} to this address. Ensure the sender is on the{" "}
          {item.payChain.toUpperCase()} network otherwise you might lose your
          deposit
        </p>
      </div>
      <Button
        onClick={() => router.push("/success")}
        className="
    bg-primary
    text-button-text
    text-base
    rounded-full
    py-5
    px-10 w-full
    max-w-[80%]
    absolute
   bottom-8
    left-1/2
    transform -translate-x-1/2
    cursor-pointer
  "
      >
        I have sent it
      </Button>
    </div>
  );
}
