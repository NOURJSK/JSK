"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, Tag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface CheckoutFormProps {
  onBack: () => void
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discountAmount, setDiscountAmount] = useState(0)
  const [discountError, setDiscountError] = useState("")

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Tunisia",
    },
    shippingCost: 15, // Default shipping cost
  })

  const subtotal = getTotalPrice()
  const total = subtotal - discountAmount + formData.shippingCost

  const validateDiscount = async () => {
    if (!discountCode.trim()) return

    try {
      const response = await fetch("http://localhost:9000/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode, orderAmount: subtotal }),
      })

      const result = await response.json()

      if (result.valid) {
        const discount = result.discount
        let amount = 0
        
        if (discount.type === 'percentage') {
          amount = (subtotal * discount.value) / 100
        } else {
          amount = discount.value
        }

        setDiscountAmount(amount)
        setDiscountError("")
        toast({
          title: "Discount Applied",
          description: `You saved ${amount.toFixed(2)} TND!`,
        })
      } else {
        setDiscountError(result.error)
        setDiscountAmount(0)
      }
    } catch (error) {
      setDiscountError("Failed to validate discount code")
      setDiscountAmount(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order
      const orderData = {
        ...formData,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          selectedVariants: item.selectedVariants,
        })),
        discountCode: discountCode || undefined,
        subtotal,
        discountAmount,
        total,
      }

      const response = await fetch("http://localhost:9000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        
        // Initiate payment
        const paymentResponse = await fetch(`http://localhost:9000/payment/initiate/${order.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardNumber: "", // Will be handled by clicktopay.com.tn
            expiryDate: "",
            cvv: "",
          }),
        })

        if (paymentResponse.ok) {
          const paymentResult = await paymentResponse.json()
          
          // Redirect to clicktopay.com.tn
          window.location.href = paymentResult.paymentUrl
          
          clearCart()
        } else {
          throw new Error("Payment initiation failed")
        }
      } else {
        const error = await response.json()
        throw new Error(error.message || "Order creation failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to process order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.shippingAddress.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, street: e.target.value }
                      })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.shippingAddress.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                        })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.shippingAddress.zipCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, zipCode: e.target.value }
                        })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="state">State/Region</Label>
                    <Input
                      id="state"
                      value={formData.shippingAddress.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, state: e.target.value }
                      })}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Discount Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Discount Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase())
                      setDiscountError("")
                      setDiscountAmount(0)
                    }}
                  />
                  <Button type="button" onClick={validateDiscount}>
                    Apply
                  </Button>
                </div>
                {discountError && (
                  <p className="text-sm text-red-600 mt-2">{discountError}</p>
                )}
                {discountAmount > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    Discount applied: -{discountAmount.toFixed(2)} TND
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedVariants)}`} className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:9000${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">
                          {item.quantity} × {item.price} TND
                        </p>
                        {item.selectedVariants && (
                          <div className="flex space-x-1 mt-1">
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
                      <div className="text-sm font-medium">
                        {(item.price * item.quantity).toFixed(2)} TND
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{subtotal.toFixed(2)} TND</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-{discountAmount.toFixed(2)} TND</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formData.shippingCost} TND</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{total.toFixed(2)} TND</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <img src="/clicktopay-logo.png" alt="ClickToPay" className="h-6" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You will be redirected to ClickToPay.com.tn to complete your payment securely.
                    </p>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleSubmit}
                    disabled={loading || items.length === 0}
                  >
                    {loading ? "Processing..." : `Pay ${total.toFixed(2)} TND`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}