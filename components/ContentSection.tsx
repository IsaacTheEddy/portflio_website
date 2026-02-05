import Image from "next/image";

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  imageUrl: string;
  reverse?: boolean;
}

export default function ContentSection({
  title,
  children,
  imageUrl,
  reverse = false,
}: ContentSectionProps) {
  const flexDirection = reverse ? "flex-row-reverse" : "flex-row";

  return (
    <section className="flex h-screen items-center justify-center w-full ">
      <div>
        <h2 className="mt-5 mx-15 text-3xl font-bold mb-4 ">{title}</h2>
        <div
          className={`flex flex-col md:flex md:flex-row items-center justify-center mx-15 md:gap-50  opacity-95 bg-gray-800 rounded-4xl`}
        >
          <div className="flex md:flex-row flex-col md:w-1/2 p-8 md:gap-x-10 rounded-2xl text-white">
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={500}
              className="rounded-3xl p-8 flex items-center justify-center"
            />
            <p>{children}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
