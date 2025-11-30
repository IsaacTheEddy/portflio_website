"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import VerticalCard from "@/components/VerticalCard";
import AtlasCinPic from "@/public/assets/Atlas_Cinema_Pic.png";
import AtlasMusicPlayer from "@/public/assets/Atlas_Music_Player.png";
import AtlasCinemaVid from "@/public/assets/videos/Atlas_Cinema_Vid.mp4";
import AtlasMusicPlayerVid from "@/public/assets/videos/Atlas_Music_Player_Vid.mp4";

const MusicLink = "https://gilded-granita-cb7364.netlify.app/";

export default function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <h2 className="text-4xl font-bold mb-8">Portfolio</h2>

      {/* CAROUSEL WRAPPER */}
      <div className="relative w-full max-w-7xl px-4">
        {/* EMBLA VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* EMBLA CONTAINER */}
          <div className="flex gap-6">
            {/* SLIDE 1 [Cinema Guru] */}
            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] min-w-0 flex justify-center">
              <VerticalCard
                img={AtlasCinPic.src}
                title="Cinema Guru"
                video={AtlasCinemaVid}
                link="https://atlas-cinema-guru-inky.vercel.app/"
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
            {/* SLIDE 3[Dk Yet] */}
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
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-center gap-4 mt-6">
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
  );
}
