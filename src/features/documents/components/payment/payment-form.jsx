"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, Lock } from "lucide-react";

import { Button } from "../../../../lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../lib/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../lib/ui/form";
import { Input } from "../../../../lib/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../lib/ui/select";

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, { message: "Card number must be 16 digits" }),
  expiryMonth: z.string().min(1, { message: "Month is required" }),
  expiryYear: z.string().min(1, { message: "Year is required" }),
  cvv: z
    .string()
    .regex(/^[0-9]{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
});

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      console.log("Processing payment:", values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/app/confirmation");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Information</span>
        </CardTitle>
        <CardDescription>
          Enter your card details to complete your purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        e.target.value = formatted;
                        field.onChange(e.target.value.replace(/\s/g, ""));
                      }}
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                      </FormControl>

                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={(i + 1).toString().padStart(2, "0")}
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                      </FormControl>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={(new Date().getFullYear() + i)
                            .toString()
                            .slice(-2)}
                        >
                          {(new Date().getFullYear() + i).toString().slice(-2)}
                        </SelectItem>
                      ))}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="mr-2 h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Secure payment processing</p>
        <p>All card information is encrypted</p>
      </CardFooter>
    </Card>
  );
}
