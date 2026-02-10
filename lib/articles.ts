import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"

import type { ArticleItem } from "../types"
import { title } from "process"

const articleDirectory = path.join(process.cwd(), "articles")

export function getSortedArticls() {
    const fileNames = fs.readdirSync(articleDirectory)
    const allArticles = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/, "")

        const fullPath = path.join(articleDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, "utf-8")

        const matterResult = matter(fileContents)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            category: matterResult.data.category
        }
    })

    return allArticles.sort((a, b) => {
        const format = "'DD-MM-YYYY"
        const dateOne = moment(a.date, format)
        const dateTwo = moment(b.date, format)
        if (dateOne.isBefore(dateTwo)) {
            return -1
        } else if (dateTwo.isAfter(dateOne)) {
            return 1
        } else {
            return 0
        }
    })
}

export function getCatagorizedArticles() {
    const sortedArticles = getSortedArticls()
    const catogrisedArticles: Record<string, ArticleItem[]> = {}

    sortedArticles.forEach(article => {
        if (!catogrisedArticles[article.category]) {
            catogrisedArticles[article.category] = []
        }
        catogrisedArticles[article.category].push(article)
    })

    return catogrisedArticles
}

export async function getArticleData(id: string) {
    const fullPath = path.join(articleDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf-8")
    const matterResult = matter(fileContent)
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(matterResult.content)

    const htmlReady = processedContent.toString()

    return {
        id,
        htmlReady,
        title: matterResult.data.title,
        category: matterResult.data.cattegory,
        date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM DD YYYY"),
    }

}