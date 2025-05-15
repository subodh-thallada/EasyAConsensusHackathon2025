import { 
  Shield, 
  Copy, 
  LineChart, 
  Zap, 
  Lock, 
  Users 
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Trading",
    description: "Built on Aptos blockchain with advanced security measures and smart contract audits."
  },
  {
    icon: <Copy className="w-6 h-6" />,
    title: "Copy Trading",
    description: "Automatically replicate successful traders' strategies with customizable risk settings."
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Real-time Analytics",
    description: "Track your portfolio performance with detailed analytics and market insights."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Execution",
    description: "Lightning-fast trade execution powered by Aptos's high-performance blockchain."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Asset Security",
    description: "Your assets remain in your control with our non-custodial trading system."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Join a thriving community of traders and share strategies and insights."
  }
];

const Features = () => {
  return (
    <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 bg-aptos-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-aptos-primary to-aptos-accent bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="mt-2 text-base text-gray-300 max-w-2xl mx-auto">
            Experience the future of trading with our comprehensive suite of features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Feature Card */}
              <div className="h-full p-6 rounded-xl bg-aptos-dark/50 border border-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-aptos-primary/50">
                {/* Icon Container */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-aptos-primary/10 text-aptos-primary group-hover:bg-aptos-primary/20 transition-colors">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {feature.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-24 h-24 bg-aptos-primary/10 rounded-full blur-2xl group-hover:bg-aptos-primary/20 transition-all duration-300" />
                <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-aptos-accent/10 rounded-full blur-2xl group-hover:bg-aptos-accent/20 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aptos-primary/10 text-aptos-primary hover:bg-aptos-primary/20 transition-colors cursor-pointer">
            <span className="text-sm font-medium">Explore All Features</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
