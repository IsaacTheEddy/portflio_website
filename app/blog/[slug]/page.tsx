import { notFound } from "next/navigation";
import { articlesRegistry } from "@/lib/articles";

export async function generateStaticParams() {
  return articlesRegistry.map((article) => ({
    slug: article.id,
  }));
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articlesRegistry.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  const PostComponent = article.component;

  return <PostComponent />;
}
