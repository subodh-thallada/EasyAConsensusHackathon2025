
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About AptosTradeFlow</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simplifying crypto trading by letting you automatically follow top-performing
            traders on the Aptos blockchain.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At AptosTradeFlow, we're on a mission to democratize crypto trading by making
              professional-level strategies accessible to everyone. We believe that by enabling
              everyday users to follow successful traders, we can help more people participate
              in the benefits of the crypto economy.
            </p>
            <p className="text-muted-foreground">
              Built on Aptos, we leverage the blockchain's speed, security, and scalability to
              offer a seamless copy-trading experience that's both transparent and efficient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-aptos-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-aptos-primary">1</span>
                </div>
                <h3 className="font-medium mb-2">Create Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up, connect your wallet, and select your preferred risk level to get started.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-aptos-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-aptos-primary">2</span>
                </div>
                <h3 className="font-medium mb-2">Choose Traders</h3>
                <p className="text-sm text-muted-foreground">
                  Browse top-performing traders and select those who match your investment goals.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-aptos-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-aptos-primary">3</span>
                </div>
                <h3 className="font-medium mb-2">Auto-Copy Trades</h3>
                <p className="text-sm text-muted-foreground">
                  Our smart contracts automatically mirror their trades in your portfolio.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Aptos?</h2>
            <p className="text-muted-foreground mb-4">
              We chose to build on the Aptos blockchain because of its:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>High throughput and low transaction costs</li>
              <li>Strong security model built on Move language</li>
              <li>Growing ecosystem of DeFi applications</li>
              <li>Commitment to user experience and mainstream adoption</li>
            </ul>
            <p className="text-muted-foreground">
              Aptos' parallel execution engine allows us to process multiple trades simultaneously,
              ensuring your portfolio stays in sync with your chosen traders even during high-volume
              market activity.
            </p>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default About;
