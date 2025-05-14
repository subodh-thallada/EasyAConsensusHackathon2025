
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </div>
    </Layout>
  );
};

export default Index;
