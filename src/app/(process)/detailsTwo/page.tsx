"use client";
import Header from "@/components/Header";
import StepThree from "@/components/steps/StepThree";

export default function page() {
  return (
    <div>
      <Header title="Recipient details" />
      <div className="mt-8">
        <StepThree />
      </div>
    </div>
  );
}
