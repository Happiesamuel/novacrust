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
import { StepTwoSchema } from "@/lib/schemas";
import SelectPays from "../SelectPays";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const STORAGE_KEY = "step-two";

type FormInput = z.input<typeof StepTwoSchema>;
type FormOutput = z.output<typeof StepTwoSchema>;

export default function StepTwo() {
  const form = useForm<FormInput>({
    resolver: zodResolver(StepTwoSchema),
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
  const arr = [
    { name: "GT Bank", slug: "gtb" },
    { name: "Access Bank", slug: "access" },
    { name: "UBA", slug: "uba" },
    { name: "firstbank", slug: "firstbank" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"bank"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-primary">
                Bank
              </FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-input cursor-pointer border w-full rounded-full p-6">
                    <SelectValue
                      className="text-primary text-base"
                      placeholder="Select an option"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="bg-white border-input">
                  {arr?.map((pay) => (
                    <SelectItem
                      key={pay.slug}
                      className="text-sm text-primary hover:bg-[#f5f5f5] cursor-pointer font-medium"
                      value={pay.slug}
                    >
                      {pay.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="text-base font-medium text-primary">
                Account number
              </FormLabel>
              <FormControl>
                <Input
                  className="border-[#e0e0e0] border focus-visible:ring focus-visible:ring-green-300 text-base placeholder:text-grey bg-white px-6! py-4! rounded-full"
                  placeholder="Enter your account number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="text-base font-medium text-primary">
                Account name
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="border-[#e0e0e0] disabled:bg-secondary border focus-visible:ring focus-visible:ring-green-300 text-base placeholder:text-grey bg-white px-6! py-4! rounded-full"
                  placeholder="Enter your account number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
