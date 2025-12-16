"use client";
import Header from "@/components/Header";
import StepTwo from "@/components/steps/StepTwo";

export default function page() {
  return (
    <div>
      <Header title="Recipient details" />
      <div className="mt-8">
        <StepTwo />
      </div>
    </div>
  );
}
