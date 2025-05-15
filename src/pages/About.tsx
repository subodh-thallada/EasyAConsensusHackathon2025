
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About InvestPro</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering everyday investors to access elite crypto strategies — transparently and securely on the Aptos blockchain.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At InvestPro, we believe the best investment strategies shouldn't be reserved for insiders. 
            Our mission is to democratize access to high-performance crypto strategies by making them investable through tokenized portfolios.
          </p>
          <p className="text-muted-foreground">
            We’re building a new paradigm for crypto investing — one where transparency, automation, and alignment with proven asset managers replaces speculation and guesswork.
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
                Sign up, connect your wallet, and set your investing preferences and risk appetite.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-aptos-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-aptos-primary">2</span>
              </div>
              <h3 className="font-medium mb-2">Browse Strategy Tokens</h3>
              <p className="text-sm text-muted-foreground">
                Explore tokenized strategies managed by professional traders and hedge funds, each with detailed performance data and metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-aptos-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-aptos-primary">3</span>
              </div>
              <h3 className="font-medium mb-2">Invest Directly</h3>
              <p className="text-sm text-muted-foreground">
                Purchase strategy tokens — your investment scales with the performance of the strategy you back.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Aptos?</h2>
          <p className="text-muted-foreground mb-4">
            We built InvestPro on Aptos for its technical superiority and next-gen capabilities:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Low-latency transactions with high throughput</li>
            <li>Move-based smart contracts for secure logic execution</li>
            <li>Parallel transaction processing for real-time performance</li>
            <li>A fast-growing ecosystem of high-quality DeFi infrastructure</li>
          </ul>
          <p className="text-muted-foreground">
            Aptos' architecture allows us to execute fund strategy rebalancing, investor flows, and token redemptions seamlessly — giving users confidence, control, and speed.
          </p>
        </section>
      </div>
      </div>
    </Layout>
  );
};

export default About;
