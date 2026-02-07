import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getArticleData } from "@/lib/articles";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleData(params.slug);

  return (
    <section className="h-full mx-auto w-10/12 md:w-11/12 mt-20 flex flex-col gap-5 text-black">
      <div className="flex justify-between items-center">
        <Link href={"/blog"} className="flex gap-3">
          <ArrowLeftIcon className="back-arrow h-6 w-6 my-auto " />
          <p className="md:text-2xl">Back Home</p>
        </Link>
        <p className="md:text-2xl">{article.date.toString()}</p>
      </div>
      <article
        className="article md:mt-15 md:w-[80%] md:mx-auto"
        dangerouslySetInnerHTML={{ __html: article.htmlReady }}
      />
    </section>
  );
}
