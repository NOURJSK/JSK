"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Percent, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Discount {
  id: string
  code: string
  name: string
  description: string
  type: string
  value: number
  minimumAmount: number
  usageLimit: number
  usedCount: number
  validFrom: string
  validUntil: string
  isActive: boolean
  createdAt: string
}

export function DiscountsManager() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minimumAmount: 0,
    usageLimit: 0,
    validFrom: "",
    validUntil: "",
    isActive: true,
  })

  useEffect(() => {
    fetchDiscounts()
  }, [])

  const fetchDiscounts = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:9000/discounts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setDiscounts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch discounts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      const url = editingDiscount
        ? `http://localhost:9000/discounts/${editingDiscount.id}`
        : "http://localhost:9000/discounts"
      
      const response = await fetch(url, {
        method: editingDiscount ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Discount ${editingDiscount ? "updated" : "created"} successfully`,
        })
        fetchDiscounts()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save discount",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (discount: Discount) => {
    setEditingDiscount(discount)
    setFormData({
      code: discount.code,
      name: discount.name,
      description: discount.description,
      type: discount.type,
      value: discount.value,
      minimumAmount: discount.minimumAmount,
      usageLimit: discount.usageLimit,
      validFrom: discount.validFrom ? new Date(discount.validFrom).toISOString().split('T')[0] : "",
      validUntil: discount.validUntil ? new Date(discount.validUntil).toISOString().split('T')[0] : "",
      isActive: discount.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:9000/discounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Discount deleted successfully",
        })
        fetchDiscounts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete discount",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minimumAmount: 0,
      usageLimit: 0,
      validFrom: "",
      validUntil: "",
      isActive: true,
    })
    setEditingDiscount(null)
  }

  if (loading) {
    return <div>Loading discounts...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Discounts Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDiscount ? "Edit Discount" : "Add New Discount"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Discount Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="WELCOME10"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">
                    Value {formData.type === 'percentage' ? '(%)' : '(TND)'}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="minimumAmount">Minimum Amount (TND)</Label>
                  <Input
                    id="minimumAmount"
                    type="number"
                    step="0.01"
                    value={formData.minimumAmount}
                    onChange={(e) => setFormData({ ...formData, minimumAmount: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="usageLimit">Usage Limit (0 = unlimited)</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDiscount ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <Card key={discount.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  {discount.type === 'percentage' ? (
                    <Percent className="w-4 h-4 mr-2" />
                  ) : (
                    <DollarSign className="w-4 h-4 mr-2" />
                  )}
                  {discount.code}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(discount)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(discount.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant={discount.isActive ? "default" : "secondary"}>
                    {discount.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-lg font-bold">
                    {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value} TND`}
                  </span>
                </div>
                <p className="text-sm font-medium">{discount.name}</p>
                <p className="text-sm text-gray-600">{discount.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Used: {discount.usedCount}/{discount.usageLimit || '∞'}</p>
                  <p>Min Amount: {discount.minimumAmount} TND</p>
                  {discount.validUntil && (
                    <p>Expires: {new Date(discount.validUntil).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}