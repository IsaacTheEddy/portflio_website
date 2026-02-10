import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  category: string;
  articles: ArticleItem[];
}

export default function ArticleItemList({ category, articles }: Props) {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/10 shadow-xl transition-all hover:shadow-2xl">
      <h2 className="text-4xl font-bol bg-clip-text text-black bg-linear-to-r from-gray-900 to-gray-100 dark:from-white dark:to-gray-600 pb-2 border-b border-gray-200/20">
        {category}
      </h2>
      <div className="flex flex-col gap-4">
        {articles.map((article, id) => {
          return (
            <Link
              href={`/blog/${article.id}`}
              key={id}
              className="group flex flex-col p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-Tan transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-sans opacity-75 group-hover:opacity-100">
                {article.date}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
