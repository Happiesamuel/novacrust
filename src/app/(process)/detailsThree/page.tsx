"use client";
import Header from "@/components/Header";
import StepFour from "@/components/steps/StepFour";

export default function page() {
  return (
    <div>
      <Header title="Send ETH to the address below" />
      <div className="mt-8">
        <StepFour />
      </div>
    </div>
  );
}
