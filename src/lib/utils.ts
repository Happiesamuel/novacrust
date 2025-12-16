import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Copied to clipboard!"))
    .catch(() => toast.error("Failed to copy"));
};
