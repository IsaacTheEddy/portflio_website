import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from "remark"
import html from "remark-html

import type {ArticleItem} from "../types"
import { title } from "process"

const articleDirectory = path.join(process.cwd(), "articles")

export function getSortedArticls () {
    const fileNames = fs.readdirSync(articleDirectory)
    const allArticles = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/,"")

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
        if(dateOne.isBefore(dateTwo)){
            return -1
        }else if (dateTwo.isAfter(dateOne)){
            return 1
        } else {
            return 0
        }
    })
}

export function getCatagorizedArticles(){
    const sortedArticles = getSortedArticls()
    const catogrisedArticles: Record<string, ArticleItem[]> = {}

    sortedArticles.forEach(article => {
        if(!catogrisedArticles[article.category]){
            catogrisedArticles[article.category] = []
        }
        catogrisedArticles[article.category].push(article)
    })

    return catogrisedArticles
}