import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

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

  cvv: z
    .string()
    .regex(/^[0-9]{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
});

const otpSchema = z.object({
  otp: z.string().regex(/^[0-9]{6}$/, { message: "OTP must be 6 digits" }),
});

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [paymentMethodId] = useState("pm_card_visa");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const documentId = queryParams.get("documentId");

  const paymentForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

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

  const handleBackToPayment = () => {
    setShowOtpForm(false);
    setSuccessMessage(null);
    otpForm.reset(); // Reset the OTP form
  };

  const onSubmitPayment = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/citizen/confirmPayment/${documentId}`,
        {
          paymentMethodId: paymentMethodId,
          cardDetails: {
            last4: data.cardNumber.slice(-4),
            exp_month: data.expiryMonth,
            exp_year: data.expiryYear,
          },
        }
      );

      if (response.data.status === "success") {
        setSuccessMessage(
          response.data.data.message ||
            "OTP has been sent to your registered mobile number"
        );
        setShowOtpForm(true);
        paymentForm.reset(); // Reset the payment form
      } else {
        setError(response.data.message || "Payment initiation failed");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitOtp = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/citizen/payment/${documentId}`,
        {
          otp: data.otp,
        }
      );

      if (response.data.success) {
        navigate("/payment-success", { state: { documentId } });
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      let errorMessage = "Failed to verify OTP";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAlert = () => {
    if (error) {
      return (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (successMessage) {
      return (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Success</p>
            <p>{successMessage}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span>
            {showOtpForm ? "OTP Verification" : "Payment Information"}
          </span>
        </CardTitle>
        <CardDescription>
          {showOtpForm
            ? "Enter the 6-digit OTP sent to your mobile number"
            : "Enter your card details to complete your purchase"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderAlert()}

        {showOtpForm ? (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onSubmitOtp)}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToPayment}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Back to payment details
                </span>
              </div>

              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        value={otpForm.watch("otp") || ""}
                        onChange={(e) =>
                          otpForm.setValue(
                            "otp",
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center text-sm text-muted-foreground">
                <Lock className="mr-2 h-4 w-4" />
                <span>Your transaction is secure and encrypted</span>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...paymentForm}>
            <form
              onSubmit={paymentForm.handleSubmit(onSubmitPayment)}
              className="space-y-6"
            >
              <FormField
                control={paymentForm.control}
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
                control={paymentForm.control}
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
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={paymentForm.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          paymentForm.setValue("expiryMonth", value);
                        }}
                        value={field.value}
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
                  control={paymentForm.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          paymentForm.setValue("expiryYear", value);
                        }}
                        value={field.value}
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
                            {(new Date().getFullYear() + i)
                              .toString()
                              .slice(-2)}
                          </SelectItem>
                        ))}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={paymentForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          {...field}
                          maxLength={4}
                          inputMode="numeric"
                        />
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
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Secure payment processing</p>
        <p>All card information is encrypted</p>
      </CardFooter>
    </Card>
  );
}
