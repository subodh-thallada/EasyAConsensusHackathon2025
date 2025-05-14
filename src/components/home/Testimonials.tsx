
const testimonials = [
  {
    content: "AptosTradeFlow simplified my crypto experience. I've been following top traders for 3 months and have seen a 24% increase in my portfolio.",
    author: "Alex Johnson",
    role: "Retail Investor",
    avatar: "AJ",
  },
  {
    content: "As a trader, I can now monetize my strategy while helping others. The platform is intuitive and the Aptos integration is seamless.",
    author: "Sarah Williams",
    role: "Asset Manager",
    avatar: "SW",
  },
  {
    content: "The risk-based matching feature is brilliant. I selected 'low risk' and was paired with conservative traders that match my investment style.",
    author: "Michael Chen",
    role: "New Crypto Investor",
    avatar: "MC",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by traders worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their trading experience 
            with AptosTradeFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="gradient-card p-6 relative"
            >
              <div className="mb-8">
                <svg 
                  className="h-10 w-10 text-aptos-primary/20" 
                  fill="currentColor" 
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="mb-6 text-muted-foreground">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-aptos-primary text-white flex items-center justify-center font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
