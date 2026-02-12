"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import VerticalCard from "@/components/VerticalCard";
import AtlasCinPic from "@/public/assets/Atlas_Cinema_Pic.png";
import AtlasMusicPlayer from "@/public/assets/Atlas_Music_Player.png";
import SmileSchool from "@/public/assets/Smile_School.png";
import RockAndRoll from "@/public/assets/Rock_And_Roll.png";
import AtlasCinemaVid from "@/public/assets/videos/Cinema_Guru.mp4";
import AtlasMusicPlayerVid from "@/public/assets/videos/Atlas_Music_Player_Vid.mp4";
import WurdoPic from "@/public/assets/WurdoLogo.png"

const MusicLink = "https://gilded-granita-cb7364.netlify.app/";
const SmileSchoolLink =
  "https://isaactheeddy.github.io/atlas-web-development/css_advanced/index.html";
const RockAndRollLink = "https://isaactheeddy.github.io/atlas-bootstrap/";

export default function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  3;

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <h2 className="text-4xl font-bold mb-8">Portfolio</h2>

      <div className="flex items-center justify-center gap-2 mb-6 text-gray-500">
        <span className="text-sm font-medium">Swipe to explore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 animate-bounce-right"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
      {/* CAROUSEL WRAPPER */}
      <div className="relative w-full max-w-7xl px-4">
        {/* EMBLA VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* EMBLA CONTAINER */}
          <div className="flex gap-6">
             {/* SLIDE 0 [Wurdo] */}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={WurdoPic.src}
                title="Wurdo ( WIP )"
                link="https://wurdo-testing.vercel.app/"
                isVideo = {false}
              >
                Wurdo is a word game unlike any other. Using machine learning we created a system that 
                can generate infinite unique words in a word ladder puzzle. It includes a scoring system
                based on the difficulty of the word and the rarity of the word. You can score using an anagram, 
                changing one letter of the previous word
                or rhyming with the previous word. 
                <br></br>
                
                <br></br>
                How high can you go?
                {/* <ul>
                  <li className="">
                    <b>Next.js 15 and React 19:</b> Developed with the latest
                    versions of these leading web development frameworks,
                    demonstrating the developer's commitment to staying
                  </li>
                  <li className="">
                    <b>NextAuth.js v5:</b> Implements robust authentication,
                    allowing users to seamlessly sign in with their GitHub
                    accounts and access personalized movie lists.
                  </li>
                  <li className="">
                    <b>Machine Learning: </b> 
                  </li>
                </ul> */}
              </VerticalCard>
            </div>
            {/* SLIDE 1 [Cinema Guru] */}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={AtlasCinPic.src}
                title="Cinema Guru"
                video={AtlasCinemaVid}
                link="https://atlas-cinema-guru-inky.vercel.app/"
                mute={true}
              >
                This is a modern web application built with a Next.js frontend
                and backend, utilizing a Vercel Postgres database. This
                application empowers users to browse and manage a comprehensive
                list of movies, offering features such as filtering by genre and
                release year, adding movies to personalized favorite and "watch
                later" lists, and tracking recent activity.
                <br></br>
                <br></br>
                <ul>
                  <li className="">
                    <b>Next.js 15 and React 19:</b> Developed with the latest
                    versions of these leading web development frameworks,
                    demonstrating the developer's commitment to staying
                  </li>
                  <li className="">
                    <b>NextAuth.js v5:</b> Implements robust authentication,
                    allowing users to seamlessly sign in with their GitHub
                    accounts and access personalized movie lists.
                  </li>
                  <li className="">
                    <b>Vercel Postgres and Kysely: </b>Leverages Vercel
                    Postgres, a user-friendly serverless database, in
                    conjunction with Kysely, a type-safe SQL query builder that
                    enhances security by preventing SQL injection attacks.
                  </li>
                </ul>
              </VerticalCard>
            </div>

            {/* SLIDE 2 [Music Player]*/}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={AtlasMusicPlayer.src}
                title="Music Player"
                video={AtlasMusicPlayerVid}
                link={MusicLink}
              >
                Welcome to the Atlas Music Player project. This application was
                developed to demonstrate core front-end engineering skills
                through the construction of a simple, clean, and highly
                responsive music playback interface. The project emphasizes
                functional, component-based architecture and modern development
                tooling.
                <br></br>
                <br></br>
                <ul>
                  <li>
                    <b>React:</b> Utilized this popular library to construct the
                    user interface. Its component-based architecture was
                    leveraged to ensure the codebase is modular, organized, and
                    highly reusable.
                  </li>
                  <li>
                    <b>Vite & TypeScript:</b> The build process was handled by
                    Vite, chosen for its speed and smooth development
                    experience. TypeScript was implemented across the project to
                    maintain code quality, enhance collaboration, and
                    proactively catch bugs.
                  </li>
                  <li>
                    <b>JSON-based Data Management:</b> The playlist information
                    is managed using a simple and effective JSON file. This data
                    is accessed and integrated into the application using
                    asynchronous fetching, ensuring efficient loading of the
                    music catalog.
                  </li>
                </ul>
              </VerticalCard>
            </div>
            {/* SLIDE Smile School */}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={SmileSchool.src}
                title="Smile School"
                link={SmileSchoolLink}
                isVideo={false}
              >
                This Smile School project. This application was developed to
                demonstrate core front-end engineering skills through the
                construction of a simple, clean, and robust use of responsive
                design. The project emphasizes UI design through base styling
                and layout.
                <br></br>
                <br></br>
                <ul>
                  <li>
                    <b>HTML:</b> HTML is the builidng block of the web. With so
                    many tools and librarys made to make HTML eaiser to use and
                    less of a focus, I set out to make it my entire focus.
                  </li>
                  <li>
                    <b>CSS:</b> Using CSS for styling, The entire webpage was
                    handcrafted to be responsive, modern and sleek.
                  </li>
                </ul>
              </VerticalCard>
            </div>
            {/* SLIDE Rock and Roll */}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={RockAndRoll.src}
                title="Rock and Roll Inc"
                link={RockAndRollLink}
                isVideo={false}
              >
                This is a fun website I made using HTML/CSS and Bootstrap. This
                was a project to practice using the Bootstrap framework for
                styling and UI. The mock content was staged as an Excavation
                Company that specilizes in collecting and selling various rocks.
                Featuring actual rock knowledge the links in the footer are
                hilarous and should not be overlooked.
                <br></br>
                <br></br>
                <ul>
                  <li>
                    <b>HTML:</b> HTML is the builidng block of the web. With so
                    many tools and librarys made to make HTML eaiser to use and
                    less of a focus, I set out to make it my entire focus.
                  </li>
                  <li>
                    <b>BootStrap</b> Using BootStrap for styling, The entire
                    webpage was handcrafted to be responsive, modern and sleek.
                  </li>
                </ul>
              </VerticalCard>
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-center gap-60  mt-6">
            <button
              className="px-4 py-2 bg-gray-700 rounded  hover:bg-gray-600 text-white  transition-colors"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-700 rounded  hover:bg-gray-600 text-white  transition-colors"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
