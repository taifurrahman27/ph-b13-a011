import CategoriesSection from "@/components/home/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyCrowdFunding from "@/components/home/WhyCrowdFunding";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <CategoriesSection />
      <WhyCrowdFunding />

    </main>
  );
}
