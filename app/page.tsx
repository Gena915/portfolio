import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AgenticBand from "@/components/AgenticBand";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AIHost from "@/components/AIHost";
import ScrollFX from "@/components/ScrollFX";
import ChatAgent from "@/components/ChatAgent";

export default function Home() {
  return (
    <>
      <AIHost />
      <ScrollFX />
      <ChatAgent />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <AgenticBand />
        <Projects />
        <Stack />
        <About />
        <Contact />
      </main>
    </>
  );
}
