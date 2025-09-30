"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NewsArticleProps {
  article: {
    id: number
    title: string
    excerpt: string
    content: string
    image: string
    date: string
    author: string
    category: string
    readTime?: string
    tags?: string[]
    relatedArticles?: Array<{
      id: number
      title: string
      image: string
      date: string
      category: string
    }>
  }
}

export function NewsArticle({ article }: NewsArticleProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out this article: ${article.title}`

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      setShowShareMenu(false)
      return
    }

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute top-6 left-6">
          <Link href="/news">
            <Button variant="ghost" className="text-white hover:text-green-400 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-green-500 text-black text-sm font-bold rounded-full uppercase tracking-wide">
              {article.category}
            </span>
            {article.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            {article.excerpt}
          </motion.p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                onClick={() => setShowShareMenu(!showShareMenu)}
                variant="ghost"
                className="text-white hover:text-green-400 hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg p-2 z-10"
                >
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Copy Link
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 pt-12 border-t border-gray-800"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.relatedArticles.map((related) => (
                  <Link key={related.id} href={`/news/${related.id}`}>
                    <div className="group bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                      <img
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <span className="text-green-400 text-xs font-medium uppercase tracking-wide">
                          {related.category}
                        </span>
                        <h4 className="text-white font-semibold mt-1 group-hover:text-green-400 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-2">{new Date(related.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
