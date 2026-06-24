"use client";

import React, { useState } from "react";
import Link from "next/link";
import VerticalCard from "@/components/VerticalCard";
import AtlasCinPic from "@/public/assets/Atlas_Cinema_Pic.png";
import AtlasMusicPlayer from "@/public/assets/Atlas_Music_Player.png";
import SmileSchool from "@/public/assets/Smile_School.png";
import RockAndRoll from "@/public/assets/Rock_And_Roll.png";
import WurdoPic from "@/public/assets/WurdoLogo.png";

const MusicLink = "https://gilded-granita-cb7364.netlify.app/";
const SmileSchoolLink =
  "https://isaactheeddy.github.io/atlas-web-development/css_advanced/index.html";
const RockAndRollLink = "https://isaactheeddy.github.io/atlas-bootstrap/";

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-4 md:px-8">
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Portfolio
        </h2>
        <p className="text-gray-400 text-lg">
          Check out my projects showcasing my full-stack engineering, front-end architecture, and design system implementations. Designs by me ofc
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl lg:p-10">
        {projects.map((project) => (
          <VerticalCard
            key={project.id}
            img={project.img}
            title={project.title}
            link={project.link}
            category={project.category}
            onClick={() => setActiveProject(project)}
          >
            {project.description}
          </VerticalCard>
        ))}
      </div>

      {/* Modal overlay for detailed view */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up text-left"
          >
            {/* Header image */}
            <div className="relative aspect-video w-full bg-gray-850">
              <img
                src={activeProject.img}
                alt={activeProject.title}
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus:outline-none"
                aria-label="Close details"
              >
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                  {activeProject.category}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {activeProject.title}
              </h3>
              <div className="text-gray-300 text-sm leading-relaxed mb-8 max-h-[30vh] overflow-y-auto pr-2 space-y-4">
                {activeProject.longDescription}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-800">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-800"
                >
                  Launch Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const projects = [
  {
    id: "wurdo",
    title: "Wurdo ( WIP )",
    category: "Web/Game Development",
    img: WurdoPic.src,
    link: "https://wurdo-testing.vercel.app/",
    description:
      "Wurdo is a word game unlike any other. Using machine learning, we created a system that can generate infinite unique words in a word ladder puzzle.",
    longDescription: (
      <div className="space-y-4">
        <p>
          Originally developed for a school Capstone project in under 2 weeks by a team of 5, Wurdo is an innovative word game currently undergoing active development (servers are temporarily Hiatus/offline).
        </p>
        <p>
          Wurdo leverages machine learning models to generate infinite unique word ladder puzzles. It scores users dynamically based on word rarity, difficulty of combinations, and anagram/rhyme parameters.
        </p>
        <p>
          Read the full timeline and deployment notes on the{" "}
          <Link href="/blog/WurdoDeployed" className="text-blue-400 hover:underline">
            Wurdo blog post
          </Link>.
        </p>
      </div>
    ),
  },
  {
    id: "cinema-guru",
    title: "Cinema Guru",
    category: "Full-Stack Web",
    img: AtlasCinPic.src,
    link: "https://atlas-cinema-guru-inky.vercel.app/",
    description:
      "A complete Next.js full-stack web application integrating Vercel Postgres, secure NextAuth v5 credentials, and Kysely queries.",
    longDescription: (
      <div className="space-y-4">
        <p>
          This movie discovery platform was designed to show user-friendly database manipulation, security practices, and custom dashboard state variables.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Next.js 15 & React 19:</b> Harnesses modern React features alongside Next.js Server Components and file-based routing.
          </li>
          <li>
            <b>NextAuth.js v5:</b> Secure session tokens and credentials verification using GitHub integration.
          </li>
          <li>
            <b>Vercel Postgres & Kysely:</b> Type-safe schema query optimization to index, save, and aggregate movie search databases dynamically.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "music-player",
    title: "Music Player",
    category: "Frontend Development",
    img: AtlasMusicPlayer.src,
    link: MusicLink,
    description:
      "A beautiful, responsive HTML5 music player dashboard built using React context APIs, async audio tracking, and strict TypeScript types.",
    longDescription: (
      <div className="space-y-4">
        <p>
          A frontend interface built to master custom audio control handlers, web audio event emitters, and state updates in React.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>State & Context APIs:</b> Unified layout state management for playlist queues, play/pause timing, and volume control.
          </li>
          <li>
            <b>TypeScript Type Safety:</b> Strictly declared interfaces for tracks, controls, and volume handlers.
          </li>
          <li>
            <b>Asynchronous Loading:</b> Direct playlist configuration fetching to ensure lightweight asset rendering.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "smile-school",
    title: "Smile School",
    category: "Web Design",
    img: SmileSchool.src,
    link: SmileSchoolLink,
    description:
      "A responsive landing page layout designed entirely with semantic HTML, custom CSS rules, flexbox, and strict typography styling.",
    longDescription: (
      <div className="space-y-4">
        <p>
          Built to solidify foundational CSS skills and demonstrate pixel-perfect design translation without relying on bulky CSS libraries.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Semantic HTML:</b> Fully compliant hierarchy structure mapping screen readers and search crawlers.
          </li>
          <li>
            <b>Pure Custom CSS:</b> Responsive flex/grid breakpoints, fluid typography, and custom micro-animations.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "rock-and-roll",
    title: "Rock and Roll Inc",
    category: "Bootstrap Design",
    img: RockAndRoll.src,
    link: RockAndRollLink,
    description:
      "A responsive mock site using Bootstrap rules, utility tags, custom columns, and styled components.",
    longDescription: (
      <div className="space-y-4">
        <p>
          Staged as a playful excavation business, this site showcases the ability to rapidly iterate responsive layouts using standard Bootstrap patterns.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>Bootstrap Grid:</b> Implements fluid alignment grids, responsive navbars, custom footers, and modal helpers.
          </li>
          <li>
            <b>Custom Overrides:</b> Tailwind-like typography variables mapped to standard classes to guarantee a premium look.
          </li>
        </ul>
      </div>
    ),
  },
];
