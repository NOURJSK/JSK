"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  selectedVariants?: {
    size?: string
    color?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string, variants?: any) => void
  updateQuantity: (id: string, quantity: number, variants?: any) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(product.selectedVariants)
      )

      if (existingItemIndex > -1) {
        const newItems = [...prevItems]
        newItems[existingItemIndex].quantity += 1
        return newItems
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
    setIsOpen(true)
  }

  const removeFromCart = (id: string, variants?: any) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === id && JSON.stringify(item.selectedVariants) === JSON.stringify(variants))
      )
    )
  }

  const updateQuantity = (id: string, quantity: number, variants?: any) => {
    if (quantity <= 0) {
      removeFromCart(id, variants)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}