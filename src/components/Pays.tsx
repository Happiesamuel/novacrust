import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { StepOneSchema } from "@/lib/schemas";
import { Input } from "./ui/input";
type PaysProps = {
  control: Control<z.infer<typeof StepOneSchema>>;
  name: FieldPath<z.infer<typeof StepOneSchema>>;
  name2: FieldPath<z.infer<typeof StepOneSchema>>;
  label: string;
  arr: { [keys: string]: string }[];
};
export default function Pays({ control, name, name2, label, arr }: PaysProps) {
  return (
    <div className="space-y-6">
      <div className="gap-2  border border-[#e0e0e0] rounded-[30px] p-6">
        <p className="text-base font-medium text-grey">{label}</p>
        <div className="flex items-center gap-6 justify-between">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0.00"
                    type="number"
                    className="text-2xl  font-semibold shadow-none "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={name2}
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-25 justify-between gap-2 rounded-full cursor-pointer py-2! px-3!  border border-input bg-[#F7F7F7]"
                      >
                        <div className="flex items-center gap-1">
                          <Image
                            width={20}
                            height={20}
                            alt="img"
                            className="rounded-full"
                            src={
                              field.value
                                ? arr.find((f) => f.value === field.value)?.img
                                : ""
                            }
                          />
                          {field.value
                            ? arr.find((f) => f.value === field.value)?.label
                            : ""}
                        </div>
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-66 py-4 px-3 rounded-4xl border bg-white border-input">
                    <Command>
                      <div className="rounded-4xl border-input border flex items-center px-4   gap-1">
                        <SearchIcon className="size-4  opacity-50" />
                        <CommandInput placeholder="Search" />
                      </div>
                      <CommandList>
                        <CommandEmpty>No Chain found.</CommandEmpty>
                        <CommandGroup>
                          {arr.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              className={cn(
                                "cursor-pointer flex items-center gap-2  p-3 rounded-2xl hover:bg-[#f5f5f5] text-primary text-sm font-medium",
                                field.value === framework.value
                                  ? "bg-[#f5f5f5]  "
                                  : ""
                              )}
                              onSelect={() => field.onChange(framework.value)}
                            >
                              <Image
                                width={24}
                                height={24}
                                alt="img"
                                className="rounded-full"
                                src={framework.img}
                              />
                              {framework.slug}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value === framework.value
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

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
