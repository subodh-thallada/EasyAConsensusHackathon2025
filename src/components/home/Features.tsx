
import { Shield, TrendingUp, BarChart, Wallet } from 'lucide-react';

const features = [
  {
    title: 'Easy Onboarding',
    description: 'Connect your wallet and start copy trading within minutes. No complex setup required.',
    icon: Wallet,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Yield-Targeted Risk Options',
    description: 'Choose your risk level and get matched with traders that match your investment goals.',
    icon: TrendingUp,
    color: 'bg-aptos-accent/10 text-aptos-accent',
  },
  {
    title: 'Performance Analytics',
    description: 'Track your portfolio performance with advanced analytics and real-time data.',
    icon: BarChart,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Aptos-Backed Security',
    description: 'Built on the secure and scalable Aptos blockchain for optimal performance and safety.',
    icon: Shield,
    color: 'bg-aptos-primary/10 text-aptos-primary',
  },
];

const Features = () => {
  return (
    <section className="section-padding bg-white dark:bg-aptos-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trade smarter, not harder
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it simple to follow top performing traders on the Aptos blockchain
            and automatically mirror their successful strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="gradient-card p-6 flex flex-col items-start transition-all duration-200 hover:shadow-lg"
            >
              <div className={`p-3 rounded-lg mb-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
