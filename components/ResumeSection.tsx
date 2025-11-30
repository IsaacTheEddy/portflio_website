"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import dynamic from "next/dynamic";

// Dynamically import the PDFViewer with SSR disabled to avoid canvas errors
const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

export default function ResumeChoice() {
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

  const resumes = [
    {
      title: "Full-Stack Web Developer",
      file: "/Isaac Edwards Full-Stack Web Developer Resume.pdf",
    },
    {
      title: "Front-End Engineer",
      file: "/Isaac Edwards Resume_Front-End_Engineer.pdf",
    },
    {
      title: "Back-End Engineer",
      file: "/_Isaac Edwards Resume Back-End Engineer.pdf",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      {/* CAROUSEL WRAPPER */}
      <div className="relative max-w-full px-4">
        {/* EMBLA VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* EMBLA CONTAINER */}
          <div className="flex">
            {resumes.map((resume, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-12"
              >
                {/* Title Section (Left) */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center">
                  <h2 className="text-3xl font-bold text-center md:text-right md:text-5xl leading-tight">
                    {resume.title}
                  </h2>
                </div>

                {/* PDF Section (Right) */}
                <div className="w-full md:w-2/3 flex justify-center md:justify-start">
                  <div className="w-full max-w-4xl shadow-lg">
                    <PDFViewer file={resume.file} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={scrollPrev}
            aria-label="Previous resume"
          >
            Previous
          </button>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={scrollNext}
            aria-label="Next resume"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
