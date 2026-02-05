"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const GradientBlinds = dynamic(() => import("@/components/GradientBlinds"), {
  ssr: false,
});

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        {isMobile ? (
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(45deg, #CFB284)",
              mixBlendMode: "darken",
            }}
          />
        ) : (
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
        )}
      </div>
      <main className="relative z-10">{children}</main>
    </>
  );
}
