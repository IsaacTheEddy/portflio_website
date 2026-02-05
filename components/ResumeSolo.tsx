"use client";

import React from "react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

export default function ResumeSolo() {
  const resume = {
    title: "Full-Stack Web Engineer",
    file: "/Isaac Edwards Updated Full-Stack Res.pdf",
    text: "Full-stack web developer with a strong foundation in Data Analysis and Business Management.",
  };
  return (
    <>
      <div className="flex md:flex-row flex-col gap-y-5 items-center justify-center w-full p-10">
        {/* Title Section (Left) */}
        <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-end items-center text-white">
          <h2 className="text-3xl font-bold text-center md:text-left md:text-5xl leading-tight">
            {resume.title}
          </h2>
          <p className="mt-2 text-center md:text-left">{resume.text}</p>
          <div className="mt-4">
            <a
              href={resume.file}
              download={`Isaac Edwards ${resume.title.replace(
                /\s+/g,
                "_",
              )}.pdf`}
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
    </>
  );
}
