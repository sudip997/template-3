import { Container } from "@/components/layout/container";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <main id="main">
        <Hero />
      </main>
    </Container>
  );
}
