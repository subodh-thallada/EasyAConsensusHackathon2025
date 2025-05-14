
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does copy trading work on AptosTradeFlow?",
    answer:
      "Copy trading on AptosTradeFlow leverages the Aptos blockchain to automatically mirror the trades of your chosen asset managers. When you allocate a percentage of your portfolio to a trader, our smart contracts ensure their trades are replicated in your portfolio in real-time, proportional to your allocation.",
  },
  {
    question: "What are the fees for using AptosTradeFlow?",
    answer:
      "We charge a small 1% fee on profitable trades. There are no subscription fees or hidden charges. Asset managers may set their own success fees which are clearly displayed on their profiles before you choose to follow them.",
  },
  {
    question: "How do I choose the right traders to follow?",
    answer:
      "Our platform provides comprehensive data on each trader including their historical performance, risk rating, trading style, and portfolio composition. You can also filter traders based on your risk preference (low, medium, high) to find those that match your investment goals.",
  },
  {
    question: "Can I become an asset manager on the platform?",
    answer:
      "Yes! Experienced traders can apply to become asset managers. You'll need to connect your wallet, demonstrate your trading history, and set your performance fee. Once approved, other users can allocate funds to copy your trading strategy.",
  },
  {
    question: "Is my investment safe on AptosTradeFlow?",
    answer:
      "AptosTradeFlow is built on the secure Aptos blockchain with non-custodial smart contracts. This means you always retain control of your funds. Our copy trading contracts are audited and designed to prevent asset managers from accessing your principal investment directly.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-white dark:bg-aptos-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about AptosTradeFlow and copy trading.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
