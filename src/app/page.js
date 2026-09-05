import CategoriesSection from "@/components/home/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TopFundedCampaigns from "@/components/home/TopFundedCampaigns";
import TopTestimonials from "@/components/home/TopTestimonials";
import WhyCrowdFunding from "@/components/home/WhyCrowdFunding";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TopFundedCampaigns />
      <TopTestimonials />
      <HowItWorks />
      <CategoriesSection />
      <WhyCrowdFunding />

    </main>
  );
}
