"use client";

import Portfolio from "@/components/PortfolioSection";
import IsaacPic from "@/public/assets/Isaac_Edwards_1_Formatted.jpg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentSection from "@/components/ContentSection";
import ResumeSolo from "@/components/ResumeSolo";
import { redirect } from "next/navigation";

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

  //   useGSAP(() => {
  //     gsap.from(portfolioRef.current, {
  //       yPercent: 100,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: missionSectionRef.current,
  //         start: "bottom center",
  //         toggleActions: "play none none none",
  //       },
  //     });
  //   }, []);

  return (
    <>
      <div
        id="home"
        className="h-screen flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-5xl font-bold">Isaac Edwards</h1>
        <p className="text-2xl mt-4">Full-Stack Web Developer</p>
      </div>
      {/* Who Section */}
      <ContentSection title="Full-Stack Developer" imageUrl={IsaacPic.src}>
        Full-stack developer with a strong foundation in both Front-end/Back-end
        Development. Proven ability to build scalable applications, design and
        craft efficient RESTful APIs, and manage complex database operations,
        While also striving to integrate high performance and robust codebases.
        Eager to join a collaborative team to contribute and solve issues to
        make a more productive and efficient product. Seeking a collaborative
        environment to contribute expertise in problem-solving, thereby
        fostering a more productive and efficient product.e delivering impactful
        solutions across the entire technology stack.
      </ContentSection>
      {/* Certifications and Diplomas */}
      <section id="CertsAndDips"></section>
      {/* PortFolio Projs */}
      <section id="portfolio" ref={portfolioRef}>
        <div className="h-full opacity-90 bg-gray-800 text-white ">
          <Portfolio />
        </div>
      </section>
      {/* Resume */}
      <section id="resume" className="pt-10 ">
        <ResumeSolo />
      </section>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 opacity-80 bg-gray-800 rounded-full shadow-2xl z-50 hidden md:block">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-gray-300"
            >
              Home
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => scrollToSection("CertsAndDips")}
              className="text-white hover:text-gray-300"
            >
              Certs and Dips
            </button>
          </li> */}
          <li>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-white hover:text-gray-300"
            >
              Portfolio
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("resume")}
              className="text-white hover:text-gray-300"
            >
              Resumes
            </button>
          </li>
          <li>
            <button
              onClick={() => redirect("/blog")}
              className=" border-l-2 pl-5 pr-5 border-white text-white hover:text-gray-300"
            >
              Blog
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
