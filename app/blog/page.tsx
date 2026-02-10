import ArticleItemList from "@/components/ArticleListItem";
import { getCatagorizedArticles } from "@/lib/articles";
import { redirect } from "next/navigation";

export default function Page() {
  const articles = getCatagorizedArticles();
  console.log(articles);

  return (
    <>
    <div className="flex flex-col min-h-screen container mx-auto px-4 py-20">
      <h1 className="blog-title font-light color-black text-6xl md:text-8xl text-center text-neutral-900 mb-20 tracking-tight">
        Thought Pit
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-start w-full max-w-7xl mx-auto">
        {articles !== null &&
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </section>
    </div>
    </>
  );
}
