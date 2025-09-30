"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  subtotal: number
  discountAmount: number
  shippingCost: number
  total: number
  status: string
  paymentStatus: string
  paymentId: string
  trackingNumber: string
  discount?: any
  items: Array<{
    id: string
    quantity: number
    price: number
    selectedVariants: any
    product: {
      id: string
      name: string
      images: string[]
    }
  }>
  createdAt: string
}

export function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:9000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:9000/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Order status updated successfully",
        })
        fetchOrders()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const addTrackingNumber = async (orderId: string) => {
    if (!trackingNumber.trim()) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:9000/orders/${orderId}/tracking`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trackingNumber }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Tracking number added successfully",
        })
        setTrackingNumber("")
        fetchOrders()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tracking number",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'shipped': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-green-200 text-green-900'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div>Loading orders...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Orders Management</h2>
        <div className="flex space-x-2">
          <Badge variant="outline">Total Orders: {orders.length}</Badge>
          <Badge variant="outline">
            Pending: {orders.filter(o => o.status === 'pending').length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                  <p className="text-sm text-gray-600">{order.customerName} • {order.customerEmail}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(order)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Total:</strong> {order.total} TND
                </div>
                <div>
                  <strong>Items:</strong> {order.items.length}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>Tracking:</strong> {order.trackingNumber || 'Not assigned'}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details #{selectedOrder.id.slice(-8)}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                      <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                      <p>{selectedOrder.shippingAddress.zipCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          {item.product.images && item.product.images[0] && (
                            <img
                              src={`http://localhost:9000${item.product.images[0]}`}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × {item.price} TND
                            </p>
                            {item.selectedVariants && (
                              <p className="text-sm text-gray-600">
                                {item.selectedVariants.size && `Size: ${item.selectedVariants.size}`}
                                {item.selectedVariants.color && ` • Color: ${item.selectedVariants.color}`}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{(item.quantity * item.price).toFixed(2)} TND</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{selectedOrder.subtotal} TND</span>
                      </div>
                      {selectedOrder.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-{selectedOrder.discountAmount} TND</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{selectedOrder.shippingCost} TND</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>{selectedOrder.total} TND</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Number */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping & Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Tracking Number</Label>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.trackingNumber || 'Not assigned'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter tracking number"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                        <Button onClick={() => addTrackingNumber(selectedOrder.id)}>
                          <Truck className="w-4 h-4 mr-2" />
                          Add Tracking
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}