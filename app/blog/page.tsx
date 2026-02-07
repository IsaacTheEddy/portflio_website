import ArticleItemList from "@/components/ArticleListItem";
import { getCatagorizedArticles } from "@/lib/articles";
import { redirect } from "next/navigation";

export default function Page() {
  const articles = getCatagorizedArticles();
  console.log(articles);

  return (
    <>
      <div className="flex flex-col h-screen">
        <h1 className="font-light text-6xl text-center text-neutral-900 my-15 ">
          {" "}
          Thought Pit
        </h1>
        <section className="md:grid md:grid-cols-2 place-items-center flex flex-col ">
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
