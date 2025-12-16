"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PageTransition from "@/components/ui/PageTransition";
const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <PageTransition>
      <div className="flex items-center justify-center flex-col">
        <div className="space-y-6 text-center mt-6">
          <h4 className="text-primary text-3xl font-medium">Coming Soon!</h4>
          <p className="text-grey-200 text-lg sm:text-xl text-center">
            Crypto to Fiat Loan is almost here.
            <br />
            Enter your email and we&apos;ll let you know the moment it&apos;s
            live.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel className="text-base font-medium text-primary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="px-6 py-2.5 bg-white rounded-full border border-[#e0e0e0] focus-within:ring focus-within:ring-green-300">
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="p-0 text-base placeholder:text-grey shadow-none rounded-full w-full"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="bg-primary w-full py-3.5 mt-16 hover:bg-primary/90 transition-all duration-500 sm:py-5 rounded-full ! text-button-text text-base cursor-pointer! "
            >
              Update me
            </button>
          </form>
        </Form>
      </div>
    </PageTransition>
  );
}
