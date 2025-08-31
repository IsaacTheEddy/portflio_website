import Image from "next/image";
import GradientBlinds from "@/components/GradientBlinds";
import Title from "@/components/JobTitle";
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Title />
        <div className="h-screen flex items-center justify-center w-full relative">
          <GradientBlinds
            gradientColors={["#242426", "#731212"]}
            angle={60}
            noise={0.1}
            blindCount={5}
            blindMinWidth={70}
            spotlightRadius={0.9}
            spotlightSoftness={1}
            spotlightOpacity={0.5}
            mouseDampening={0.15}
            distortAmount={15}
            shineDirection="right"
            mixBlendMode="lighten"
          />
        </div>
      </div>
    </>
  );
}
