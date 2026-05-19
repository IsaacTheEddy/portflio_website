import ArticleItemList from "@/components/ArticleListItem";
import { getCatagorizedArticles } from "@/lib/articles";
import Link from "next/link";

export default function Page() {
  const articles = getCatagorizedArticles();
  console.log(articles);

  return (
    <>
    <div className="flex flex-col min-h-screen container mx-auto px-4 py-20">
      <h1 className="blog-title font-light color-black text-6xl md:text-8xl text-center mb-20 tracking-tight text-accent-neo">
        Thought Pit
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-start w-full max-w-7xl mx-auto text-accent-neo">
        {articles !== null &&
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </section>
       <div>
        <nav className="fixed  md:left-1/2 md:top-[90%] md:pt-5 top-[5%] w-fit p-2.5 rounded-2xl right-0 mr-auto text-center md:text-left md:w-fit md:rounded-full  md:-translate-x-1/2 md:p-4 opacity-80 bg-gray-800  shadow-2xl z-50 md:block">
          <div className="flex space-x-4 font-inter">
            <Link href={"/"} className="text-accent-neo hover:text-accent-hard-neo text-lg">
              Home
            </Link>
            <Link
              href={"/portfolio"}
              className="text-accent-neo hover:text-accent-hard-neo text-lg"
            >
              Portfolio
            </Link>
          </div>
        </nav>
      </div>
    </div>
    </>
  );
}
