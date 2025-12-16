import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { useEffect } from "react";
import { StepOneSchema } from "@/lib/schemas";
import Pays from "../Pays";
import SelectPays from "../SelectPays";
import { Button } from "../ui/button";

const chain = [
  { label: "ETH", value: "eth", slug: "USDT - ETH", img: "/eth.png" },
  { label: "CELO", value: "celo", slug: "USDT - CELO", img: "/celo.png" },
  { label: "TON", value: "ton", slug: "USDT - TON", img: "/ton.png" },
  { label: "BNB", value: "bnb", slug: "USDT - BNB", img: "/bnb.png" },
];
const payfrom = [
  { label: "Metamask", value: "metamask", img: "/metmsk.png" },
  { label: "Rainbow", value: "rainbow", img: "/rainbow.png" },
  { label: "WalletConnect", value: "connect", img: "/connect.png" },
  {
    label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
    value: "others",
    img: "/wallet.png",
  },
];
const STORAGE_KEY = "step-one";

type FormInput = z.input<typeof StepOneSchema>;
type FormOutput = z.output<typeof StepOneSchema>;

export default function StepOne() {
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
  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, [form]);

  // ✅ Auto-save on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: FormOutput) {
    console.log(values); // ✅ all numbers correctly typed
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          arr={chain}
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
