import { BsCopy } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";
export default function StepFour() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="rounded-full px-4 py-2 w-fit flex items-center gap-2 bg-button-text border border-sky">
        <p className="text-base font-medium text-primary">
          4LiV4YjbxsL6739MKghUd
        </p>
        <BsCopy className="text-primary text-xl" />
      </div>
      <div className="bg-[#F7F7F7] px-6 py-4 rounded-[10px] w-full space-y-6 mt-16">
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Amount to send</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-grey-200 ">100 ETH</p>
            <BsCopy className="text-primary text-xl" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Network</p>
          <p className="text-sm text-grey-200 ">ETH</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-grey-200 ">Wallet</p>
          <p className="text-sm text-grey-200 ">Other</p>
        </div>
      </div>
      <div className="flex items-start gap-2 w-full mt-5">
        <IoInformationCircleOutline className="text-primary text-2xl" />
        <p className="text-sm text-grey-200">
          Only send {"USDT"} to this address. Ensure the sender is on the{" "}
          {"CELO"} network otherwise you might lose your deposit
        </p>
      </div>{" "}
      <Button
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
