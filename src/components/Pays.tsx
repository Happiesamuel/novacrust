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
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "./ui/input";
type PaysProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  name2: FieldPath<T>;
  label: string;
  arr: { slug: string; label: string; img: string; value: string }[];
};

export default function Pays<T extends FieldValues>({
  control,
  name,
  name2,
  label,
  arr,
}: PaysProps<T>) {
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
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={name2}
            render={({ field }) => {
              const selected = arr.find((f) => f.value === field.value);

              return (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-25 justify-between gap-2 rounded-full cursor-pointer py-2! px-3! border border-input bg-[#F7F7F7]"
                        >
                          <div className="flex items-center gap-1">
                            {selected && (
                              <div className="aspect-square size-5 relative">
                                <Image
                                  fill
                                  alt={selected.label}
                                  className="rounded-full"
                                  src={selected.img}
                                />
                              </div>
                            )}

                            <span>{selected ? selected.label : "Select"}</span>
                          </div>

                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-66 py-4 px-3 h-64 rounded-4xl border bg-white border-input">
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
                                <div className="aspect-square size-6 relative">
                                  <Image
                                    fill
                                    alt="img"
                                    className="rounded-full  object-center object-cover"
                                    src={framework.img}
                                  />
                                </div>
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
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
