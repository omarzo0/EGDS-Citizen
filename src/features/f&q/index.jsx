import { FAQSection } from "./components/faq-sections";

export default function FAQDemo() {
  // Custom FAQ items
  const faqItems = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee on all our products. If you're not satisfied, you can return the item for a full refund within 30 days of purchase.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@example.com, by phone at (555) 123-4567, or through the live chat on our website. Our support hours are Monday to Friday, 9 AM to 6 PM EST.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 100 countries worldwide. International shipping typically takes 7-14 business days, depending on the destination and customs processing.",
    },
    {
      question: "Are there any subscription fees?",
      answer:
        "We offer both free and premium subscription plans. The free plan includes basic features, while our premium plans start at $9.99/month and include additional features and priority support.",
    },
    {
      question: "How secure is my personal information?",
      answer:
        "We take data security very seriously. All personal information is encrypted using industry-standard protocols, and we never share your data with third parties without your explicit consent.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your subscription plan at any time. Changes to your plan will take effect at the start of your next billing cycle.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FAQSection
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our products, services, and policies."
        faqs={faqItems}
      />
    </div>
  );
}
