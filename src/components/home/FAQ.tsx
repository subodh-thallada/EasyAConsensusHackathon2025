
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="section-padding bg-white dark:bg-aptos-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn how to invest in top crypto talent through tokenized strategies on AptosTradeFlow.
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
