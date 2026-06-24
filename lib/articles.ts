import type { ArticleItem } from "../types";
import moment from "moment";

// Import the MDX modules statically
import * as HoustonIdeas from "../articles/HoustonIdeas.mdx";
import * as BellaBeats from "../articles/BellaBeats_Case-Study.mdx";
import * as WurdoDeployed from "../articles/WurdoDeployed.mdx";

export const articlesRegistry = [
  {
    id: "HoustonIdeas",
    ...HoustonIdeas.metadata,
    component: HoustonIdeas.default,
  },
  {
    id: "BellaBeats_Case-Study",
    ...BellaBeats.metadata,
    component: BellaBeats.default,
  },
  {
    id: "WurdoDeployed",
    ...WurdoDeployed.metadata,
    component: WurdoDeployed.default,
  },
];

export function getSortedArticls(): ArticleItem[] {
  const articles = articlesRegistry.map((a) => ({
    id: a.id,
    title: a.title,
    date: a.date,
    category: a.category,
  }));

  return articles.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);
    if (dateOne.isBefore(dateTwo)) {
      return 1; // Show newest first
    } else if (dateOne.isAfter(dateTwo)) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getCatagorizedArticles(): Record<string, ArticleItem[]> {
  const sortedArticles = getSortedArticls();
  const catogrisedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    if (!catogrisedArticles[article.category]) {
      catogrisedArticles[article.category] = [];
    }
    catogrisedArticles[article.category].push(article);
  });

  return catogrisedArticles;
}
