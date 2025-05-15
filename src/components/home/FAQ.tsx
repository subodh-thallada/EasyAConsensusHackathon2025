import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems = [
  {
    question: "How does investing in personal coins work?",
    answer:
      "Each trader or hedge fund on the platform issues their own token that represents their strategy. When you invest, you're buying into that strategy via their personal coin. As their performance grows, so does the value of your investment.",
  },
  {
    question: "What are the fees for using AptosTradeFlow?",
    answer:
      "We charge a small platform fee on successful returns. Traders and funds may also set performance fees tied to their coin's value growth — all transparently displayed before you invest.",
  },
  {
    question: "How do I choose who to invest in?",
    answer:
      "Each trader and fund has a public profile showcasing historical returns, strategy style, risk score, and token performance. You can browse, filter by volatility and return goals, and choose based on what aligns with your preferences.",
  },
  {
    question: "Can I launch my own strategy coin?",
    answer:
      "Yes! If you're a skilled trader or fund manager, you can tokenize your strategy and offer it to the community. You'll need to verify your wallet and trading history to get started.",
  },
  {
    question: "Is my investment secure?",
    answer:
      "Yes. All funds are held in non-custodial smart contracts on the Aptos blockchain. Your tokens remain in your wallet, and no manager can access your principal directly. The contracts are audited for transparency and safety.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-aptos-dark">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-base text-gray-300">
            Everything you need to know about AptosTradeFlow
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden bg-aptos-dark/50 backdrop-blur-sm"
            >
              <button
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-aptos-dark/80 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base font-medium text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform duration-200",
                    openIndex === index && "transform rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "px-4 transition-all duration-200 ease-in-out",
                  openIndex === index
                    ? "max-h-96 opacity-100 py-3"
                    : "max-h-0 opacity-0"
                )}
              >
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Still have questions?{" "}
            <a
              href="mailto:support@aptostradeflow.com"
              className="text-aptos-primary hover:text-aptos-accent transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
