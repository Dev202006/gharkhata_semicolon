import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-16">
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;