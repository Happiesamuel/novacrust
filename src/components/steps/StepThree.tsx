import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect } from "react";
import { StepThreeSchema } from "@/lib/schemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import PhoneInputField from "../PhoneInput";

const STORAGE_KEY = "step-three";

type FormInput = z.input<typeof StepThreeSchema>;
type FormOutput = z.output<typeof StepThreeSchema>;

export default function StepThree() {
  const form = useForm<FormInput>({
    resolver: zodResolver(StepThreeSchema),
  });
  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, [form]);

  // ✅ Auto-save on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: FormOutput) {
    console.log(values); // ✅ all numbers correctly typed
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="text-base font-medium text-primary">
                Recipient email
              </FormLabel>
              <FormControl>
                <Input
                  className="border-[#e0e0e0] border focus-visible:ring focus-visible:ring-green-300 text-base placeholder:text-grey bg-white px-6! py-4! rounded-full"
                  placeholder="Enter recipient email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneInputField
          control={form.control}
          phoneName="phoneNumber"
          countryName="countryCode"
        />

        <Button
          type="submit"
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
          Next
        </Button>
      </form>
    </Form>
  );
}
