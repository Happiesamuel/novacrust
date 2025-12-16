import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type PaysProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  arr: { label: string; value: string; img: string }[];
};
export default function SelectPays<T extends FieldValues>({
  control,
  label,
  arr,
  name,
}: PaysProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = arr.find((p) => p.value === field.value);
        return (
          <FormItem>
            <FormLabel className="text-base font-medium text-primary">
              {label}
            </FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-input cursor-pointer border w-full rounded-full p-6">
                  {selectedOption ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={selectedOption.img}
                        alt={selectedOption.label}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{selectedOption.label}</span>
                    </div>
                  ) : (
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select an option"
                    />
                  )}
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
          </FormItem>
        );
      }}
    />
  );
}
