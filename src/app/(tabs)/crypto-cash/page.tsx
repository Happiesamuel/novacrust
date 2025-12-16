"use client";
import StepOne from "@/components/steps/StepOne";
import PageTransition from "@/components/ui/PageTransition";

export default function page() {
  return (
    <PageTransition>
      <StepOne />
    </PageTransition>
  );
}
