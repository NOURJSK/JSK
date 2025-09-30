"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { newsApi } from "@/lib/newsApi"
import { useLanguage } from "@/lib/language-context"

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
      <section id="news" className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-white mt-4">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section id="news" className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wide mb-4">
              <span className="text-green-500">JSK</span> News
            </h2>
            <p className="text-gray-400 text-lg">No news available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="relative py-24 bg-black overflow-hidden">
      {/* Animated Neon Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-green-500/10 blur-3xl animate-pulse rounded-full" />
        <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-green-400/10 blur-3xl animate-pulse rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wide">
            <span className="text-green-500">JSK</span> News
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg md:text-xl">
            Stay updated with our latest victories, updates, and official announcements.
          </p>
        </motion.div>

        {/* Responsive Spotlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group overflow-hidden rounded-3xl shadow-lg shadow-green-800/20 hover:shadow-green-500/50 transition-all duration-500
                ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              {/* Image */}
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                    {item.category}
                  </span>
                  <span className="text-gray-400 text-xs">{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 tracking-wide group-hover:text-green-400 transition-colors"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-gray-300 mb-4 leading-relaxed line-clamp-4"
                >
                  {item.excerpt}
                </motion.p>

                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{
                      x: 5,
                      textShadow: "0 0 15px rgba(34,197,94,0.7)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-green-400 font-bold uppercase tracking-wider hover:text-green-300 transition-colors"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>

                  <span className="text-gray-500 text-xs">By {item.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
