import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useEffect } from "react";
import { StepTwoSchema } from "@/lib/schemas";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "step-two";

type FormInput = z.input<typeof StepTwoSchema>;
type FormOutput = z.output<typeof StepTwoSchema>;

export default function StepTwo() {
  const router = useRouter();
  const form = useForm<FormInput>({
    resolver: zodResolver(StepTwoSchema),
  });
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit: SubmitHandler<FormInput> = (values) => {
    const parsed: FormOutput = StepTwoSchema.parse(values);

    console.log(parsed);
    router.push("/detailsTwo");
  };
  const onError = (errors: typeof form.formState.errors) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof FormInput;
    if (firstErrorKey) {
      const message = errors[firstErrorKey]?.message as string;
      toast.error(message);
    }
  };
  const arr = [
    { name: "GT Bank", slug: "gtb" },
    { name: "Access Bank", slug: "access" },
    { name: "UBA", slug: "uba" },
    { name: "firstbank", slug: "firstbank" },
  ];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name={"bank"}
          render={({ field }) => {
            const selectedOption = arr.find((p) => p.slug === field.value);
            return (
              <FormItem>
                <FormLabel className="text-base font-medium text-primary">
                  Bank
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-input cursor-pointer border w-full rounded-full p-6">
                      {selectedOption ? (
                        <div className="flex items-center gap-2">
                          <span>{selectedOption.name}</span>
                        </div>
                      ) : (
                        <SelectValue
                          className="text-primary text-base"
                          placeholder="Select an option"
                        />
                      )}
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-white w-70 border-input">
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
              </FormItem>
            );
          }}
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
                <div className="px-6 py-2.5 bg-white rounded-full border border-[#e0e0e0] focus-within:ring focus-within:ring-green-300">
                  <Input
                    {...field}
                    value={field.value as number | ""}
                    placeholder="Enter your account number"
                    type="number"
                    className="p-0 text-base placeholder:text-grey shadow-none rounded-full w-full"
                  />
                </div>
              </FormControl>
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
                <div className="px-6 py-2.5 bg-white rounded-full border border-[#e0e0e0] focus-within:ring focus-within:ring-green-300 peer-disabled:bg-secondary">
                  <Input
                    {...field}
                    disabled
                    placeholder="Enter your account name"
                    className="peer p-0 text-base placeholder:text-grey shadow-none rounded-full w-full disabled:bg-secondary"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <button
          className="
    bg-primary
    text-button-text
    text-base
    rounded-full
  py-3.5 hover:bg-primary/90 transition-all duration-500 sm:py-5 w-full
    max-w-[80%]
    absolute
   bottom-8
    left-1/2
    transform -translate-x-1/2
    cursor-pointer
  "
          type="submit"
        >
          Next
        </button>
      </form>
    </Form>
  );
}
