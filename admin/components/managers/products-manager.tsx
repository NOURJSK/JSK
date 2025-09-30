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
import { Plus, Edit, Trash2, Upload, Image, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  images: string[]
  videos: string[]
  variants: {
    sizes?: string[]
    colors?: string[]
  }
  category: string
  game?: any
  isFeatured: boolean
  translations: {
    en: { name: string; description: string }
    fr: { name: string; description: string }
    ar: { name: string; description: string }
  }
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    videos: [],
    variants: { sizes: [], colors: [] },
    category: "Apparel",
    gameId: "",
    isFeatured: false,
    translations: {
      en: { name: "", description: "" },
      fr: { name: "", description: "" },
      ar: { name: "", description: "" },
    },
  })

  const categories = ["Apparel", "Accessories", "Gaming Gear", "Collectibles"]

  useEffect(() => {
    fetchProducts()
    fetchGames()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:9000/games")
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error("Failed to fetch games")
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setUploadingFiles(true)
    const token = localStorage.getItem("token")
    const formData = new FormData()

    Array.from(files).forEach(file => {
      formData.append('files', file)
    })

    try {
      const response = await fetch("http://localhost:9000/products/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        const newImages = result.files.filter(f => f.type === 'image').map(f => f.url)
        const newVideos = result.files.filter(f => f.type === 'video').map(f => f.url)

        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages],
          videos: [...prev.videos, ...newVideos],
        }))

        toast({
          title: "Success",
          description: "Files uploaded successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      })
    } finally {
      setUploadingFiles(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const token = localStorage.getItem("token")

  const submitData = {
    ...formData,
    gameId: formData.gameId === "none" ? "" : formData.gameId
  }

  try {
    const url = editingProduct
      ? `http://localhost:9000/products/${editingProduct.id}`
      : "http://localhost:9000/products"
    
    const response = await fetch(url, {
      method: editingProduct ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Product ${editingProduct ? "updated" : "created"} successfully`,
        })
        fetchProducts()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    }
  }

const handleEdit = (product: Product) => {
  setEditingProduct(product)
  setFormData({
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    images: product.images || [],
    videos: product.videos || [],
    variants: product.variants || { sizes: [], colors: [] },
    category: product.category,
    gameId: product.game?.id || "none", 
    isFeatured: product.isFeatured,
    translations: product.translations || {
      en: { name: product.name, description: product.description },
      fr: { name: "", description: "" },
      ar: { name: "", description: "" },
    },
  })
  setIsDialogOpen(true)
}

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:9000/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        })
        fetchProducts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      images: [],
      videos: [],
      variants: { sizes: [], colors: [] },
      category: "Apparel",
      gameId: "",
      isFeatured: false,
      translations: {
        en: { name: "", description: "" },
        fr: { name: "", description: "" },
        ar: { name: "", description: "" },
      },
    })
    setEditingProduct(null)
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Products Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                  className="min-h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
  <div>
    <Label htmlFor="price">Price (TND)</Label>
    <Input
      id="price"
      type="number"
      step="0.01"
      value={isNaN(formData.price) ? "" : formData.price}
      onChange={(e) => {
        const value = e.target.value;
        setFormData({ 
          ...formData, 
          price: value === "" ? 0 : Math.max(0, parseFloat(value) || 0)
        })
      }}
      required
    />
  </div>
  <div>
    <Label htmlFor="stock">Stock</Label>
    <Input
      id="stock"
      type="number"
      value={isNaN(formData.stock) ? "" : formData.stock}
      onChange={(e) => {
        const value = e.target.value;
        setFormData({ 
          ...formData, 
          stock: value === "" ? 0 : Math.max(0, parseInt(value) || 0)
        })
      }}
      required
    />
  </div>
  <div>
    <Label htmlFor="category">Category</Label>
    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {categories.map(cat => (
          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>

              <div className="grid grid-cols-2 gap-4">
                <div>
  <Label htmlFor="game">Associated Game (Optional)</Label>
  <Select value={formData.gameId} onValueChange={(value) => setFormData({ ...formData, gameId: value })}>
    <SelectTrigger>
      <SelectValue placeholder="Select game" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="none">No Game</SelectItem>
      {games.map(game => (
        <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: !!checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <div>
                  <Label>Upload Images & Videos</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {uploadingFiles ? "Uploading..." : "Click to upload images and videos"}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Display uploaded images */}
                {formData.images.length > 0 && (
                  <div>
                    <Label>Images</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={`http://localhost:9000${image}`} alt="" className="w-full h-20 object-cover rounded" />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display uploaded videos */}
                {formData.videos.length > 0 && (
                  <div>
                    <Label>Videos</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.videos.map((video, index) => (
                        <div key={index} className="relative">
                          <video src={`http://localhost:9000${video}`} className="w-full h-20 object-cover rounded" />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeVideo(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Variants */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sizes (comma separated)</Label>
                  <Input
                    value={formData.variants.sizes?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      variants: {
                        ...formData.variants,
                        sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }
                    })}
                    placeholder="S, M, L, XL"
                  />
                </div>
                <div>
                  <Label>Colors (comma separated)</Label>
                  <Input
                    value={formData.variants.colors?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      variants: {
                        ...formData.variants,
                        colors: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }
                    })}
                    placeholder="Black, White, Green"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploadingFiles}>
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.isFeatured && <Badge variant="default">Featured</Badge>}
                </div>
                <p className="text-sm"><strong>Price:</strong> {product.price} TND</p>
                <p className="text-sm"><strong>Stock:</strong> {product.stock}</p>
                <p className="text-sm text-gray-600">{product.description.substring(0, 100)}...</p>
                {product.images && product.images.length > 0 && (
                  <img 
                    src={`http://localhost:9000${product.images[0]}`} 
                    alt={product.name} 
                    className="w-full h-32 object-cover rounded" 
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}