import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { Form } from "../ui/form";
import { useEffect } from "react";
import { StepOneSchema } from "@/lib/schemas";
import Pays from "../Pays";
import SelectPays from "../SelectPays";
import { Button } from "../ui/button";
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

  const receiveAmount = useWatch({
    control: form.control,
    name: "receiveAmount",
  }) as number;

  useEffect(() => {
    if (!payAmount) return;

    const next = payAmount * 5;
    const current = form.getValues("receiveAmount");

    if (current !== next) {
      form.setValue("receiveAmount", next, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [payAmount, form]);

  useEffect(() => {
    if (!receiveAmount) return;

    const next = receiveAmount / 5;
    const current = form.getValues("payAmount");

    if (current !== next) {
      form.setValue("payAmount", next, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [receiveAmount, form]);

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
          arr={chain}
          control={form.control}
        />
        <Pays
          label="You recieve"
          name="receiveAmount"
          name2="receiveChain"
          arr={currencies}
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

        <Button
          type="submit"
          className="bg-primary w-full  rounded-full px-10! text-button-text text-base cursor-pointer! py-5!"
        >
          Convert now
        </Button>
      </form>
    </Form>
  );
}
