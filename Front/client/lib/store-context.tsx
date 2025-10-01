"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockProducts, type Product, categories, sortOptions, priceRanges } from "./store-data"
import { useLanguage } from "./language-context"

interface StoreFilters {
  category: string
  subcategory: string
  priceRange: { min: number; max: number } | null
  inStockOnly: boolean
  featured: boolean
  onSale: boolean
  isNew: boolean
  searchQuery: string
  sortBy: string
}

interface StoreContextType {
  products: Product[]
  filteredProducts: Product[]
  filters: StoreFilters
  loading: boolean
  updateFilter: (key: keyof StoreFilters, value: any) => void
  resetFilters: () => void
  getProductById: (id: string) => Product | undefined
  categories: typeof categories
  sortOptions: typeof sortOptions
  priceRanges: typeof priceRanges
}

const defaultFilters: StoreFilters = {
  category: "all",
  subcategory: "all",
  priceRange: null,
  inStockOnly: false,
  featured: false,
  onSale: false,
  isNew: false,
  searchQuery: "",
  sortBy: "featured",
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<StoreFilters>(defaultFilters)
  const [loading, setLoading] = useState(true)

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading
        setProducts(mockProducts)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products]

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Subcategory filter
    if (filters.subcategory !== "all") {
      filtered = filtered.filter((product) => product.subcategory === filters.subcategory)
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) => product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max,
      )
    }

    // Stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter((product) => product.isFeatured)
    }

    // Sale filter
    if (filters.onSale) {
      filtered = filtered.filter((product) => product.isOnSale)
    }

    // New filter
    if (filters.isNew) {
      filtered = filtered.filter((product) => product.isNew)
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((product) => {
        const localizedName = product.translations[language]?.name || product.name
        const localizedDescription = product.translations[language]?.description || product.description
        return (
          localizedName.toLowerCase().includes(query) ||
          localizedDescription.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "featured":
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => {
          const nameA = a.translations[language]?.name || a.name
          const nameB = b.translations[language]?.name || b.name
          return nameA.localeCompare(nameB)
        })
        break
    }

    setFilteredProducts(filtered)
  }, [products, filters, language])

  const updateFilter = (key: keyof StoreFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        filters,
        loading,
        updateFilter,
        resetFilters,
        getProductById,
        categories,
        sortOptions,
        priceRanges,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
