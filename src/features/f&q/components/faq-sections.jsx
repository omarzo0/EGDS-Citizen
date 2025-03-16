import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../lib/ui/accordion";

export function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our products and services.",
  faqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. Follow the instructions to complete your registration.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for business accounts.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders, depending on your location.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, we offer a 30-day return policy for all products. Items must be in their original condition with all packaging and tags intact.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on our website or the carrier's website to track your package.",
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer:
        "Yes, we offer discounts for bulk orders. Please contact our sales team at sales@example.com for more information about bulk pricing.",
    },
  ],
}) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">{description}</p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl md:mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
