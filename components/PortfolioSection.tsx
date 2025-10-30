"use client";

import VerticalCard from "@/components/VerticalCard";
import AtlasCinPic from "@/public/assets/Atlas_Cinema_Pic.png";
import AtlasMusicPlayer from "@/public/assets/Atlas_Music_Player.png";

const MusicLink = "https://gilded-granita-cb7364.netlify.app/";

export default function Portfolio() {
  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <h2 className="text-4xl font-bold pb-7">Portfolio</h2>
      <div className="flex flex-row gap-x-50">
        <VerticalCard
          img={AtlasCinPic.src}
          title="Cinema Guru"
          video="/assets/videos/Atlas_Cinema_Vid.mp4"
          link="https://atlas-cinema-guru-inky.vercel.app/"
        >
          This is a modern web application built with a Next.js frontend and
          backend, utilizing a Vercel Postgres database. This application
          empowers users to browse and manage a comprehensive list of movies,
          offering features such as filtering by genre and release year, adding
          movies to personalized favorite and "watch later" lists, and tracking
          recent activity.
          <br></br>
          <br></br>
          <ul>
            <li className="">
              <b>Next.js 15 and React 19:</b> Developed with the latest versions
              of these leading web development frameworks, demonstrating the
              developer's commitment to staying
            </li>
            <li className="">
              <b>NextAuth.js v5:</b> Implements robust authentication, allowing
              users to seamlessly sign in with their GitHub accounts and access
              personalized movie lists.
            </li>
            <li className="">
              <b>Vercel Postgres and Kysely: </b>Leverages Vercel Postgres, a
              user-friendly serverless database, in conjunction with Kysely, a
              type-safe SQL query builder that enhances security by preventing SQL
              injection attacks.
            </li>
          </ul>
        </VerticalCard>
        <VerticalCard
          img={AtlasMusicPlayer.src}
          title="Music Player"
          video="/assets/videos/Atlas_Music_Player_Vid.mp4"
          link={MusicLink}
        >
          Welcome to the Atlas Music Player project. This application was
          developed to demonstrate core front-end engineering skills through the
          construction of a simple, clean, and highly responsive music playback
          interface. The project emphasizes functional, component-based
          architecture and modern development tooling.
          <br></br>
          <br></br>
          <ul>
          <li>
            <b>React:</b> Utilized this popular library to construct the user
            interface. Its component-based architecture was leveraged to ensure
            the codebase is modular, organized, and highly reusable.
          </li>
          <li>
            <b>Vite & TypeScript:</b> The build process was handled by Vite,
            chosen for its speed and smooth development experience. TypeScript
            was implemented across the project to maintain code quality, enhance
            collaboration, and proactively catch bugs.
          </li>
          <li>
            <b>JSON-based Data Management:</b> The playlist information is
            managed using a simple and effective JSON file. This data is
            accessed and integrated into the application using asynchronous
            fetching, ensuring efficient loading of the music catalog.
          </li>
          </ul>
        </VerticalCard>
      </div>
    </div>
  );
}
