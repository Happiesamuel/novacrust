import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { StepOneSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type PaysProps = {
  control: Control<z.infer<typeof StepOneSchema>>;
  name: FieldPath<z.infer<typeof StepOneSchema>>;
  label: string;
  arr?: { [keys: string]: string }[];
};
export default function SelectPays({ control, label, arr, name }: PaysProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium text-primary">
            {label}
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
                  key={pay.value}
                  className="text-sm text-primary hover:bg-[#f5f5f5] cursor-pointer font-medium"
                  value={pay.value}
                >
                  <Image
                    width={24}
                    height={24}
                    alt="img"
                    className="rounded-full"
                    src={pay.img}
                  />
                  {pay.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
