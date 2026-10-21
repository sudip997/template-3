import { Container } from "@/components/layout/container";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { LogoCloud } from "@/components/logo-cloud/logo-cloud";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <main id="main">
        <Hero />
        <LogoCloud />
        <HowItWorks />
      </main>
    </Container>
  );
}
