import Hero from "@/components/Hero";
import Layout from "../components/layout/Layout";
import Features from "@/components/home/Features";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-aptos-dark">
        <Hero />
        <Features />
        <FAQ />
      </div>
    </Layout>
  );
};

export default Index;
