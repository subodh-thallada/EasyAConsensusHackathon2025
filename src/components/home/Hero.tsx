
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block">Copy the Top Traders and Hedge Funds.</span>
              <span className="bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
                Auto-Trade via Aptos.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Effortlessly follow top-performing traders and hedge funds on the Aptos blockchain
              and automatically mirror their winning strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="bg-aptos-primary hover:bg-aptos-secondary">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  Browse Top Traders
                </Button>
              </Link>
            </div>

{/*  THE JOIN 5000+ USERS PART LOL*/}
            {/* <div className="pt-8 flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white dark:border-aptos-dark flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs font-medium text-gray-600">U{i}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="aspect-[4/3] bg-gradient-to-br from-aptos-primary to-aptos-accent rounded-lg shadow-xl p-1">
                <div className="w-full h-full bg-white dark:bg-aptos-dark rounded-md p-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-20 bg-aptos-primary/20 rounded"></div>
                    <div className="h-8 w-16 bg-aptos-accent/20 rounded"></div>
                  </div>
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md mb-4"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-aptos-light dark:bg-aptos-dark/50 rounded-lg shadow-lg p-4 animate-float">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-6 w-full bg-aptos-accent/20 rounded mb-3"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
