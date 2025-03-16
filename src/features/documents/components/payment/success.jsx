import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Thank you for your payment. Your transaction has been completed
              successfully.
            </p>
            <p className="text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
