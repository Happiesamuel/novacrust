import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { Form } from "../ui/form";
import { useEffect, useRef } from "react";
import { StepOneSchema } from "@/lib/schemas";
import Pays from "../Pays";
import SelectPays from "../SelectPays";
import { currencies, payfrom } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const chain = [
  { label: "ETH", value: "eth", slug: "USDT - ETH", img: "/eth.png" },
  { label: "CELO", value: "celo", slug: "USDT - CELO", img: "/celo.png" },
  { label: "TON", value: "ton", slug: "USDT - TON", img: "/ton.png" },
  { label: "BNB", value: "bnb", slug: "USDT - BNB", img: "/bnb.png" },
];

const STORAGE_KEY = "step-one";

type FormInput = z.input<typeof StepOneSchema>;
type FormOutput = z.output<typeof StepOneSchema>;

export default function StepOne() {
  const router = useRouter();
  const lastChanged = useRef<"pay" | "receive" | null>(null);
  const form = useForm<FormInput>({
    resolver: zodResolver(StepOneSchema),
    defaultValues: {
      payAmount: 0,
      receiveAmount: 0,
      payChain: "",
      receiveChain: "",
      payFrom: "",
      payTo: "",
    },
  });
  const payAmount = useWatch({
    control: form.control,
    name: "payAmount",
  }) as number;
  const rate = 973.5;
  const receiveAmount = useWatch({
    control: form.control,
    name: "receiveAmount",
  }) as number;
  useEffect(() => {
    if (lastChanged.current === "pay") return;
    if (typeof payAmount !== "number") return;

    const next = Number((payAmount * rate).toFixed(2));
    form.setValue("receiveAmount", next, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, [payAmount]);

  useEffect(() => {
    if (lastChanged.current !== "receive") return;
    if (typeof receiveAmount !== "number") return;

    const next = Number((receiveAmount / rate).toFixed(6));
    form.setValue("payAmount", next, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, [receiveAmount]);

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
    const parsed: FormOutput = StepOneSchema.parse(values);

    console.log(parsed);
    router.push("/details");
  };
  const onError = (errors: typeof form.formState.errors) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof FormInput;
    if (firstErrorKey) {
      const message = errors[firstErrorKey]?.message as string;
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <Pays
          label="You pay"
          name="payAmount"
          name2="payChain"
          current={(lastChanged.current = "pay")}
          arr={chain}
          control={form.control}
        />
        <Pays
          label="You recieve"
          name="receiveAmount"
          name2="receiveChain"
          arr={currencies}
          current={(lastChanged.current = "receive")}
          control={form.control}
        />
        <SelectPays
          arr={payfrom}
          name="payFrom"
          control={form.control}
          label="Pay from"
        />
        <SelectPays
          arr={payfrom}
          name="payTo"
          control={form.control}
          label="Pay to"
        />

        <button
          type="submit"
          className="bg-primary w-full py-3.5 hover:bg-primary/90 transition-all duration-500 sm:py-5 rounded-full ! text-button-text text-base cursor-pointer! "
        >
          Convert now
        </button>
      </form>
    </Form>
  );
}
