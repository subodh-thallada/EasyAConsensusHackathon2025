
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-aptos-primary/20 to-aptos-accent/20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to transform your trading experience?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of traders on the Aptos blockchain and start
          copy-trading with the best performers in just a few clicks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-aptos-primary hover:bg-aptos-secondary">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
