"use client";

import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const countries = [
  { code: "+234", label: "Nigeria", flag: "/nig.png" },
  { code: "+1", label: "United States", flag: "/nig.png" },
  { code: "+44", label: "United Kingdom", flag: "/nig.png" },
];

type PhoneInputFieldProps<T> = {
  control: Control<T>;
  phoneName: keyof T;
  countryName: keyof T;
  label?: string;
};

export default function PhoneInputField<T>({
  control,
  phoneName,
  countryName,
  label = "Recipient phone number",
}: PhoneInputFieldProps<T>) {
  const [country, setCountry] = useState(countries[0]);

  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>

      {/* Country code field */}
      <FormField
        control={control}
        name={countryName as any}
        render={({ field }) => (
          <FormControl>
            <input type="hidden" {...field} value={country.code} />
          </FormControl>
        )}
      />

      {/* Phone number field */}
      <FormField
        control={control}
        name={phoneName as any}
        render={({ field }) => (
          <>
            <div className="flex items-center rounded-full border border-[#e0e0e0] bg-white px-3 py-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center w-34 gap-2 px-2 rounded-full"
                  >
                    <Image
                      src={country.flag}
                      alt={country.label}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium">{country.code}</span>
                    <ChevronDown className="size-4 opacity-60" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-56 border-input bg-white p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((c) => (
                          <CommandItem
                            key={c.code}
                            onSelect={() => setCountry(c)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Image
                              src={c.flag}
                              alt={c.label}
                              width={20}
                              height={20}
                            />
                            <span className="flex-1">{c.label}</span>
                            <span className="text-sm">{c.code}</span>
                            <Check
                              className={cn(
                                "ml-auto size-4",
                                country.code === c.code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <div className="h-6 w-px bg-[#e0e0e0] mx-2" />

              <Input
                {...field}
                type="tel"
                placeholder="000 - 000 - 0000"
                className="border-0 shadow-none focus-visible:ring-0 px-2"
              />
            </div>

            <FormMessage />
          </>
        )}
      />
    </FormItem>
  );
}
