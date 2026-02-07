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
    <section className=" h-screen ">
      <div className="grid grid-col-1 md:mx-25 lg:mx-75 mx-10 opacity-95 px-8 py-10 bg-gray-800 rounded-4xl md: ">
        <h2 className="mt-5 mx-15 text-3xl font-bold mb-4 ">{title}</h2>
        <div className="grid md:grid-cols-2 place-items-start md:rounded-2xl text-white">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={500}
            className="rounded-3xl p-8 "
          />
          <p className="text-xl/loose">{children}</p>
        </div>
        {/* <div className="md: md:w-1/2 p-8 md:gap-x-10 rounded-2xl text-white">
          <h2 className="mt-5 mx-15 text-3xl font-bold mb-4 ">{title}</h2>
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={500}
            className="rounded-3xl p-8 "
          />
          <p>{children}</p>
        </div> */}
      </div>
    </section>
  );
}
