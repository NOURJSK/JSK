"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Star, Package } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getLocalizedContent = () => {
    if (product.translations && product.translations[language]) {
      return {
        name: product.translations[language].name || product.name,
        description: product.translations[language].description || product.description,
      }
    }
    return {
      name: product.name,
      description: product.description,
    }
  }

  const localizedContent = getLocalizedContent()

  const handleAddToCart = () => {
    if (product.variants?.sizes && !selectedSize) {
      alert("Please select a size")
      return
    }
    if (product.variants?.colors && !selectedColor) {
      alert("Please select a color")
      return
    }

    addToCart({
      id: product.id,
      name: localizedContent.name,
      price: product.price,
      image: product.images[0],
      selectedVariants: {
        size: selectedSize,
        color: selectedColor,
      },
    })
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-64 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <div className="relative">
              <img
                src={`http://localhost:9000${product.images[currentImageIndex]}`}
                alt={localizedContent.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.isFeatured && (
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {localizedContent.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {localizedContent.description}
          </p>

          {/* Variants */}
          {product.variants && (
            <div className="space-y-3 mb-4">
              {product.variants.sizes && product.variants.sizes.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.variants.colors && product.variants.colors.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.colors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-primary">
              {product.price} TND
            </div>
            <div className="text-sm text-muted-foreground">
              Stock: {product.stock}
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}