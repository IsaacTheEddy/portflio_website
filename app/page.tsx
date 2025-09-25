"use client";
import ContentSection from "@/components/ContentSection";
import IsaacPic from "@/public/assets/Isaac_Edwards_1_Formatted.jpg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const missionSectionRef = useRef(null);
  const portfolioRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useGSAP(() => {
    gsap.from(portfolioRef.current, {
      yPercent: 100,
      duration: 1,
      scrollTrigger: {
        trigger: missionSectionRef.current,
        start: "bottom center",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <>
      <div
        id="home"
        className="h-screen flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-5xl font-bold">Isaac Edwards</h1>
        <p className="text-2xl mt-4">Web Developer</p>
      </div>
      <ContentSection title="About Me" imageUrl={IsaacPic.src}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </ContentSection>
      <div ref={missionSectionRef}>
        <ContentSection title="My Mission" imageUrl={IsaacPic.src} reverse={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </ContentSection>
      </div>
      <section id="portfolio" ref={portfolioRef} className="h-screen bg-gray-800 text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Portfolio</h2>
      </section>

      {/* Floating Bottom NAvigation BAr */}
      <nav className="fixed bottom-4 left-1/2 transform -translae-x-1/22 p-2 bg-gray-800 rounded-full shadow-2xl z-50">
        <ul className="flex space-x-2 md:space-x-4">
          {["home", "about", "work", "contact"].map((section) => (
            <li key={section}>
              <button></button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
