"use client";
import { Button } from "@/components/ui/button";
import React from "react";
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
const formSchema = z.object({
  email: z.string().email(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="space-y-6 text-center mt-6">
        <h4 className="text-primary text-3xl font-medium">Coming Soon!</h4>
        <p className="text-grey-200 text-xl text-center">
          Cash to Crypto is almost here.
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
                  <Input
                    className="border-[#e0e0e0] border focus-visible:ring focus-visible:ring-green-300 text-base placeholder:text-grey bg-white px-6! py-4! rounded-full"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary w-full mt-16 rounded-full px-10! text-button-text text-base cursor-pointer! py-5!"
          >
            Update me
          </Button>
        </form>
      </Form>
    </div>
  );
}
