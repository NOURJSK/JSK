"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"
import { useLanguage } from "@/lib/language-context"
import { productApi } from "@/lib/productApi"
import { Star } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  images: string[]
  variants?: {
    sizes?: string[]
    colors?: string[]
  }
  category: string
  isFeatured: boolean
  translations: {
    en: { name: string; description: string }
    fr: { name: string; description: string }
    ar: { name: string; description: string }
  }
}

export function StoreSection() {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [featuredOnly, setFeaturedOnly] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [categoryFilter, featuredOnly])

  const fetchProducts = async () => {
    try {
      const filters: any = {}
      if (categoryFilter !== "All") filters.category = categoryFilter
      if (featuredOnly) filters.featured = true

      const data = await productApi.getAll()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["All", "Apparel", "Accessories", "Gaming Gear", "Collectibles"]

  if (loading) {
    return (
      <section id="store" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-foreground mt-4">Loading store...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="store" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="/gaming-tournament-arena-with-multiple-screens-and-.png"
          alt="Gaming Arena Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-4 animate-neon-flicker">
            JSK <span className="text-primary">Store</span>
          </h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Get your official JSK Esports merchandise and gaming gear
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-reveal">
          <div className="flex flex-wrap gap-2 backdrop-blur-sm bg-background/10 p-4 rounded-lg border border-primary/20">
            <span className="text-sm font-medium text-primary font-serif mr-2 flex items-center">
              Category:
            </span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="font-serif"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2 backdrop-blur-sm bg-background/10 p-4 rounded-lg border border-primary/20">
            <Button
              variant={featuredOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className="font-serif"
            >
              <Star className="w-4 h-4 mr-2" />
              Featured Only
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </section>
  )
}