import Header from "@/components/landing/sections/header";
import Hero from "@/components/landing/sections/hero";
import About from "@/components/landing/sections/about";
import TargetAudience from "@/components/landing/sections/target-audience";
import MakingWorkEasier from "@/components/landing/sections/making-work-easier";
import EfficientBeginning from "@/components/landing/sections/efficient-beginning";
import ContactUs from "@/components/landing/sections/contact-us";
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
      <ContactUs />
      <Footer />
    </>
  );
}
