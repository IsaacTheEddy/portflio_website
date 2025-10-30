"use client";

import dynamic from "next/dynamic";

const GradientBlinds = dynamic(() => import("@/components/GradientBlinds"), {
  ssr: false,
});

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <GradientBlinds
          gradientColors={["#FFEFCB", "#CFB284"]}
          angle={60}
          noise={0}
          dpr={1}
          mirrorGradient={true}
          blindCount={5}
          blindMinWidth={70}
          spotlightRadius={0.9}
          spotlightSoftness={0.5}
          spotlightOpacity={0.1}
          mouseDampening={0.15}
          distortAmount={15}
          shineDirection="right"
          mixBlendMode="lighten"
        />
      </div>
      <main className="relative z-10">
        {children}
      </main>
    </>
  );
}
