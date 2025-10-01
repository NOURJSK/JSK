"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { CheckoutForm } from "./checkout-form"

export function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <CheckoutForm onBack={() => setShowCheckout(false)} />
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
                <p className="text-sm text-gray-500">Add some products to get started</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedVariants)}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={`http://localhost:9000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} TND</p>
                        {item.selectedVariants && (
                          <div className="flex space-x-2 mt-1">
                            {item.selectedVariants.size && (
                              <Badge variant="outline" className="text-xs">
                                {item.selectedVariants.size}
                              </Badge>
                            )}
                            {item.selectedVariants.color && (
                              <Badge variant="outline" className="text-xs">
                                {item.selectedVariants.color}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariants)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariants)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id, item.selectedVariants)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{getTotalPrice().toFixed(2)} TND</span>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}