import { Button } from "@/components/ui/button";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="space-y-6 text-center">
        <h4 className="text-primary text-3xl font-medium">Coming Soon!</h4>
        <p className="text-grey-200 text-xl text-center">
          Cash to Crypto is almost here.
          <br />
          Enter your email and we&apos;ll let you know the moment it&apos;s
          live.
        </p>
      </div>
      <Button className="bg-primary w-full rounded-full px-10! text-button-text text-base cursor-pointer! py-5!">
        Update me
      </Button>
    </div>
  );
}
