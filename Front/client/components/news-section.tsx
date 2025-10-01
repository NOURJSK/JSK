"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { newsApi } from "@/lib/newsApi"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export function NewsSection() {
  const { language } = useLanguage()
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getAll()
        setNewsItems(data)
      } catch (error) {
        console.error("Failed to fetch news:", error)
        setNewsItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <section
        id="news"
        className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-green-500 mx-auto"></div>
            <p className="text-gray-300 mt-4 text-lg">Loading latest news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section
        id="news"
        className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Latest <span className="text-green-500">News</span>
            </h2>
            <p className="text-gray-400 text-lg">No news available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Tag className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Latest Updates</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            JSK Esports <span className="text-green-500">News</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay informed with the latest developments, match results, team updates, and industry insights from JSK
            Esports.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300"
            >
              <Link href={`/news/${item.id}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-green-400 font-medium text-sm group-hover:text-green-300 transition-colors">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition-colors"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
