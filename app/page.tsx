"use client";
import Image from "next/image";
import GradientBlinds from "@/components/GradientBlinds";
import AboutMe from "@/components/AboutMe";
import Mission from "@/components/Mission";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <GradientBlinds
          gradientColors={["#FFEFCB", "#CFB284"]}
          angle={60}
          noise={0.1}
          dpr={1}
          mirrorGradient={true}
          blindCount={5}
          blindMinWidth={70}
          spotlightRadius={0.9}
          spotlightSoftness={1}
          spotlightOpacity={0.1}
          mouseDampening={0.15}
          distortAmount={15}
          shineDirection="right"
          mixBlendMode="lighten"
        ></GradientBlinds>
      </div>
      <div className="flex h-screen items-center justify-center w-full bg-Dark-Vanilla">
        <AboutMe />
      </div>
      <div className="flex h-screen items-center justify-center w-full bg-Tan">
        <Mission />
      </div>
    </>
  );
}
