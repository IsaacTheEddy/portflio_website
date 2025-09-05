import Image from "next/image";
import IsaacPic from "@/public/assets/Isaac_Edwards_1_Formatted.jpg";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutMe() {
  const text = useRef(null);
  const picture = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".text",
        start: "40% center",
        end: "80% bottom",
        markers: true,
        onEnter: () => {
          gsap.fromTo(".words", { opacity: 0 }, { opacity: 1, duration: 3 });
        },
        onLeaveBack: () => {
          gsap.fromTo(".words", { opacity: 1 }, { opacity: 0, duration: 3 });
        },
        onLeave: () => {
          gsap.to(".words", { x: "-500%", duration: 3, ease: "back.inOut" });
        },
        onEnterBack: () => {
          gsap.to(".words", { x: "0", duration: 1, ease: "power1.in" });
        },
      });
      ScrollTrigger.create({
        trigger: ".text",
        start: "40% center",
        end: "80% bottom",
        markers: true,
        onEnter: () => {
          gsap.to(".pic", { scale: 1.111111, duration: 5 });
        },
        onLeave: () => {
          gsap.to(".pic", { scale: 1, duration: 5 });
        },
      });
    },
    { scope: picture }
  );

  return (
    <>
      <div
        ref={text}
        className="text flex flex-col h-full w-full justify-center space-y-10 p-5 "
      >
        <h1 className="words text-3xl font-bold text-black opacity-0">
          Who Am I?
        </h1>
        <p className=" words text-black opacity-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          eligendi magni ipsum officia vero animi ducimus, deleniti tenetur id
          labore praesentium! Consectetur labore exercitationem at laudantium
          ex? Placeat, numquam corporis?
        </p>
      </div>
      <div className="flex h-full w-full" ref={picture}>
        <div className="w-full h-full items-center justify-center flex">
          <Image
            src={IsaacPic.src}
            alt="Isaac Selfie"
            className="pic flex rounded-3xl"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
}
