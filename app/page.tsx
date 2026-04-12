import { BannerMain } from "@/components/fragments/banner_main";
import Skills from "@/components/fragments/skills";
import Projects from "@/components/fragments/projects";
import SocialProof from "@/components/fragments/social_proof";
import Timeline from "@/components/fragments/timeline";
import About from "@/components/fragments/about";
import Contact from "@/components/fragments/contact";
import Footer from "@/components/fragments/footer";
import Navbar from "@/components/fragments/navbar";
import SectionDock from "@/components/fragments/section_dock";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-night-deep">
      <Navbar />
      <SectionDock />
      <BannerMain />
      <Skills />
      <Projects />
      <SocialProof />
      <Timeline />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
