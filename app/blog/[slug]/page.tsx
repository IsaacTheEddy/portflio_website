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
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5 text-black">
      <div className="flex justify-between">
        <Link href={"/blog"} className="flex items-center gap-2">
          <ArrowLeftIcon className="h-6 w-6" />
          <p>Back Home</p>
        </Link>
        <p>{article.date.toString()}</p>
      </div>
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: article.htmlReady }}
      />
    </section>
  );
}
