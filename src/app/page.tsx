import { Bento } from "@/components/bento/bento";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { LogoCloud } from "@/components/logo-cloud/logo-cloud";
import { Metrics } from "@/components/metrics/metrics";
import { Navbar } from "@/components/navbar/navbar";
import { Pricing } from "@/components/pricing/pricing";
import { Testimonials } from "@/components/testimonials/testimonials";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <main id="main">
        <Hero />
        <LogoCloud />
        <Bento />
        <HowItWorks />
        <Metrics />
        <Testimonials />
        <Pricing />
      </main>
    </Container>
  );
}
