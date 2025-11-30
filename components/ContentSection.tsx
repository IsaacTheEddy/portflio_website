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
    <section className="flex h-screen items-center justify-center w-full">
      <div
        className={`flex ${flexDirection} items-center justify-center w-4/5 opacity-95 bg-gray-800 rounded-4xl`}
      >
        <div className="w-1/2 p-8 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4 ">{title}</h2>
          <p>{children}</p>
        </div>
        <div className="w-1/2 p-8 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={500}
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
