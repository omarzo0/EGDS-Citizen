import PaymentForm from "../payment/payment-form";

export default function PaymentPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
        <PaymentForm />
      </div>
    </div>
  );
}
