import Header from "@/components/landing/Header";
import Hero from "@/components/landing/sections/hero";
import About from "@/components/landing/sections/about";
import TargetAudience from "@/components/landing/sections/target-audience";
import MakingWorkEasier from "@/components/landing/sections/making-work-easier";
import EfficientBeginning from "@/components/landing/sections/efficient-beginning";
import Footer from "@/components/landing/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <TargetAudience />
      <MakingWorkEasier />
      <EfficientBeginning />
      <Footer />
    </>
  );
}
