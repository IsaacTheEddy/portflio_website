import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  category: string;
  articles: ArticleItem[];
}

export default function ArticleItemList({ category, articles }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl text-black">{category}</h2>
      <div className="flex flex-col gap-2.5 text-lg">
        {articles.map((article, id) => {
          return (
            <Link
              href={`/blog/${article.id}`}
              key={id}
              className="text-neutral-900 hover:text-amber-700 transition duration-150 "
            >
              {article.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
