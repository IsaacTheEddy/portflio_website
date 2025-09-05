import Image from "next/image";
import IsaacPic from "@/public/assets/Isaac_Edwards_1_Formatted.jpg";

export default function Mission() {
  return (
    <>
      <div className="flex h-full w-full">
        <div className="w-full h-full items-center justify-center flex">
          <Image
            src={IsaacPic.src}
            alt="Isaac Selfie"
            className="flex rounded-3xl"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-col h-full w-full justify-center space-y-10 p-5 ">
        <h1 className="text-3xl font-bold text-dark-red">Mission</h1>
        <p className="text-dark-red">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          eligendi magni ipsum officia vero animi ducimus, deleniti tenetur id
          labore praesentium! Consectetur labore exercitationem at laudantium
          ex? Placeat, numquam corporis?
        </p>
      </div>
    </>
  );
}
