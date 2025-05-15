import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is AptosTradeFlow?",
    answer: "AptosTradeFlow is a decentralized copy trading platform built on the Aptos blockchain. It allows users to automatically replicate the trading strategies of successful traders while maintaining full control of their assets."
  },
  {
    question: "How does copy trading work?",
    answer: "Copy trading allows you to automatically mirror the trades of experienced traders. When a trader you're following makes a trade, the same trade is executed in your portfolio with your allocated funds, adjusted for your risk preferences."
  },
  {
    question: "Is my investment safe?",
    answer: "Yes, your investments are secured by the Aptos blockchain. You maintain full control of your assets, and all transactions are transparent and immutable. Our smart contracts are audited and follow best security practices."
  },
  {
    question: "What are the fees?",
    answer: "We charge a small performance fee on profitable trades, which is used to incentivize top traders and maintain the platform. There are no hidden fees or subscription costs."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Connect your Aptos wallet, fund your account, and choose from our curated list of successful traders to copy. You can start with any amount and adjust your risk settings at any time."
  }
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
