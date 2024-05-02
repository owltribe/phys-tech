import Header from "@/components/landing/Header";
import Hero from "@/components/landing/sections/hero";
import About from "@/components/landing/sections/about";
import TargetAudience from "@/components/landing/sections/target-audience";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <TargetAudience />
    </>
  );
}
