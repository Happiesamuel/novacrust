"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { Check, ChevronDown, SearchIcon } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
  CommandInput,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/constants";
import { toast } from "sonner";

type PhoneInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  phoneName: Path<T>;
  countryName: Path<T>;
  label?: string;
};

export default function PhoneInputField<T extends FieldValues>({
  control,
  phoneName,
  countryName,
  label = "Recipient phone number",
}: PhoneInputFieldProps<T>) {
  const [country, setCountry] = useState(countries[0]);

  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<T>();

  // Sync country code with react-hook-form
  useEffect(() => {
    setValue(
      countryName,
      country.code as unknown as PathValue<T, typeof countryName>,
      { shouldValidate: true }
    );
  }, [country, countryName, setValue]);

  // Show toast for phone number errors
  useEffect(() => {
    const phoneError = errors[phoneName];
    if (phoneError) toast.error(phoneError.message as string);
  }, [errors, phoneName]);
  console.log(watch(countryName));
  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>

      <div className="flex items-center rounded-full border border-[#e0e0e0] bg-white px-3 py-2">
        {/* Country Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 rounded-full"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={country.flag}
                  alt={country.label}
                  fill
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium">{country.code}</span>
              <ChevronDown className="size-4 opacity-60" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-66 py-4 px-3 h-64 rounded-4xl border bg-white border-input">
            <Command>
              <div className="rounded-4xl border flex items-center px-4 gap-1 border-input">
                <SearchIcon className="size-4 opacity-50" />
                <CommandInput placeholder="Search country" />
              </div>
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((c) => (
                    <CommandItem
                      key={c.code}
                      onSelect={() => setCountry(c)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="relative w-5 h-5">
                        <Image
                          src={c.flag}
                          alt={c.label}
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <span className="flex-1">{c.label}</span>
                      <span className="text-sm">{c.code}</span>
                      <Check
                        className={cn(
                          "ml-auto size-4",
                          country.code === c.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Divider */}
        <div className="h-6 w-px bg-[#e0e0e0] mx-2" />

        {/* Phone Input */}
        <FormField
          control={control}
          name={phoneName}
          render={({ field }) => (
            <FormControl>
              <Input
                {...field}
                type="tel"
                placeholder="000 - 000 - 0000"
                className="border-0 shadow-none focus-visible:ring-0 px-2"
              />
            </FormControl>
          )}
        />
      </div>
    </FormItem>
  );
}
