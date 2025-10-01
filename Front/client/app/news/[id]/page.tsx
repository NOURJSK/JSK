import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { NewsArticle } from "@/components/news-article"
import { apiService } from "@/lib/apiService"

interface NewsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  try {
    const article = await apiService.getNewsById(params.id)

    return {
      title: `${article.title} | JSK Esports News`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [article.image],
        type: "article",
        publishedTime: article.date,
        authors: [article.author],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
    }
  } catch (error) {
    return {
      title: "Article Not Found | JSK Esports",
      description: "The requested article could not be found.",
    }
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  try {
    const article = await apiService.getNewsById(params.id)
    return <NewsArticle article={article} />
  } catch (error) {
    notFound()
  }
}
