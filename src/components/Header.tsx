import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full">
      <Image
        onClick={() => router.back()}
        width={24}
        height={24}
        alt="img"
        className="cursor-pointer"
        src={"/ArrowLeft.png"}
      />
      <h2 className="text-xl text-primary font-medium">{title}</h2>
      <div />
    </div>
  );
}
