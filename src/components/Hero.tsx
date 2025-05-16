import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 mb-[-4rem]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aptos-dark/20" />
      
      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="block bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
            Trade Smarter
          </span>
          <span className="block mt-2 text-white">
            Not Harder
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Experience the future of crypto investing with real traders, diversified strategies, and blockchain-backed transparency
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" className="bg-aptos-primary hover:bg-aptos-accent text-white px-8 py-6 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-2 px-8 py-6 text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 