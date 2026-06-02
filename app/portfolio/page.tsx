"use client";

import Portfolio from "@/components/PortfolioSection";
import IsaacPic from "@/public/assets/Isaac_Edwards_1_Formatted.jpg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentSection from "@/components/ContentSection";
import ResumeSolo from "@/components/ResumeSolo";
import FooterSocials from "@/components/FooterSocials";
import ContactMe from "@/components/ContactMe";
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
    <div>
      {/* Hero Section */}
      <section id="home"></section>
      <div className="h-screen flex flex-col items-center justify-center text-accent-neo">
        <h1 className="text-8xl font-bold font-playfairDisplay z-1">
          Isaac Edwards
        </h1>
        <p className="text-2xl mt-4 font-inter z-1">
          Full-Stack Web Developer X Data Analyst
        </p>
      </div>
      {/* Who Section */}
      <ContentSection title="Full-Stack Developer" imageUrl={IsaacPic.src}>
        Full-stack developer with a strong base in Front-end/Back-end
        Development. Proven ability to build scalable applications, design and
        craft efficient RESTful APIs, and manage complex database operations,
        While also intergrating high performance and robust codebases. Eager to
        do valuable work and to contribute and solve issues to make productive
        and efficient systems. Seeking an environment to contribute expertise in
        problem-solving.
      </ContentSection>
      {/* Certifications and Diplomas */}
      <section id="CertsAndDips"></section>
      {/* PortFolio Projs */}
      <section id="portfolio" ref={portfolioRef}>
        <div className="h-fit opacity-90 bg-gray-800 text-white ">
          <Portfolio />
        </div>
      </section>
      {/* Resume */}
      <section id="resume" className="pt-10 font-inter ">
        <ResumeSolo />
      </section>
      {/* Contact */}
      <section id="contact">
        <ContactMe />
      </section>
      <section id="footer">
        <FooterSocials />
      </section>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed  md:left-1/2 md:top-[88%] md:pt-5 top-[5%] w-fit p-2.5 rounded-2xl right-0 mr-auto text-center md:text-left md:w-fit md:rounded-full  md:-translate-x-1/2 md:p-4 opacity-80 bg-gray-800  shadow-2xl z-50 md:block">
        <ul className="flex flex-col md:flex-row space-y-8 md:space-x-4 md:space-y-0">
          <li>
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-gray-300"
            >
              About me
            </button>
          </li>
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
              Resume
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-gray-300"
            >
              Contact Me
            </button>
          </li>
          <li>
            <button
              onClick={() => redirect("/blog")}
              className=" md:border-l-2 md:pl-5  md:border-t-0 md:pt-0 border-t-2 pt-4  border-accent-neo text-accent-neo hover:text-gray-300"
            >
              Blog
            </button>
          </li>
          <li>
            <Link href={"/"} className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
