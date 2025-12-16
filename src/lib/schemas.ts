import z from "zod";

export const StepOneSchema = z.object({
  payAmount: z.coerce
    .number({ message: "Please enter a valid number" })
    .min(1, "Pay amount must be at least 1"),

  payChain: z
    .string()
    .min(1, "Please select a chain")
    .refine((val) => val.trim() !== "", "Chain cannot be empty"),

  receiveAmount: z.coerce
    .number({ message: "Please enter a valid number" })
    .min(1, "Receive amount must be at least 1"),

  receiveChain: z
    .string()
    .min(1, "Please select a currency")
    .refine((val) => val.trim() !== "", "Currency cannot be empty"),

  payFrom: z
    .string()
    .min(1, "Please select a wallet")
    .refine((val) => val.trim() !== "", "Wallet cannot be empty"),

  payTo: z
    .string()
    .min(1, "Please select a wallet")
    .refine((val) => val.trim() !== "", "Wallet cannot be empty"),
});
export const StepTwoSchema = z.object({
  accountNumber: z
    .string({ message: "Please enter a valid account number" })
    .min(10, "Account number must be at least 10 chars"),
  accountName: z.string().optional(),
  bank: z
    .string({ message: "Please select a bank" })
    .min(1, "Please select a bank")
    .refine((val) => val.trim() !== "", "Bank cannot be empty"),
});
export const StepThreeSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string({ message: "Please enter a valid number" })
    .min(7, "Enter a valid phone number"),
  countryCode: z
    .string({ message: "Select country code" })
    .min(1, "Select country code"),
});
