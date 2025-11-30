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
      text: "Full-stack web developer with a strong foundation in both front-end and back-end engineering",
    },
    // {
    //   title: "Front-End Engineer",
    //   file: "/Isaac Edwards Resume_Front-End_Engineer.pdf",
    //   text: "Front-End focused web developer with a strong foundation in both front-end/full-stack development",
    // },
    // {
    //   title: "Back-End Engineer",
    //   file: "/_Isaac Edwards Resume Back-End Engineer.pdf",
    //   text: "Back-End developer with a strong foundation in Data Analysis, API Development, and Back-End development engineering",
    // },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* CAROUSEL WRAPPER */}
      <div className="relative max-w-full px-4">
        {/* EMBLA VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* EMBLA CONTAINER */}
          <div className="flex">
            {resumes.map((resume, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 flex flex-col md:flex-row items-center justify-around gap-16 px-4 md:px-12"
              >
                {/* Title Section (Left) */}
                <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-end items-center text-white">
                  <h2 className="text-3xl font-bold text-center md:text-left md:text-5xl leading-tight">
                    {resume.title}
                  </h2>
                  {resume.text && (
                    <p className="mt-2 text-center md:text-left">
                      {resume.text}
                    </p>
                  )}
                  <div className="mt-4">
                    <a
                      href={resume.file}
                      download={`${resume.title.replace(/\s+/g, "_")}.pdf`}
                      className="rounded opacity-80 px-4 py-2  transition-colors  bg-gray-700 text-white hover:bg-gray-600"
                      aria-label={`Download ${resume.title} Resume`}
                    >
                      Download PDF
                    </a>
                  </div>
                </div>

                {/* PDF Section (Right) */}
                <div className="w-full md:w-2/3 ">
                  <div className="w-full max-w-4xl shadow-lg flex flex-col justify-center md:justify-end items-end">
                    <PDFViewer file={resume.file} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="mt-6 flex justify-around gap-4">
          <button
            className="rounded opacity-90  px-4 py-2  transition-colors  bg-gray-700 text-white hover:bg-gray-600"
            onClick={scrollPrev}
            aria-label="Previous resume"
          >
            Previous
          </button>
          <button
            className="rounded opacity-90  px-4 py-2  transition-colors  bg-gray-700 text-white hover:bg-gray-600"
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
