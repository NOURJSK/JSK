"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  link: string
  size: string
  translations: {
    en: { title: string; excerpt: string; content: string }
    fr: { title: string; excerpt: string; content: string }
    ar: { title: string; excerpt: string; content: string }
  }
  isPublished: boolean
  createdAt: string
}

export function NewsManager() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    link: "",
    size: "medium",
    translations: {
      en: { title: "", excerpt: "", content: "" },
      fr: { title: "", excerpt: "", content: "" },
      ar: { title: "", excerpt: "", content: "" },
    },
    isPublished: true,
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:9000/news")
      const data = await response.json()
      setNews(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news",
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
      const url = editingNews
        ? `http://localhost:9000/news/${editingNews.id}`
        : "http://localhost:9000/news"
      
      const response = await fetch(url, {
        method: editingNews ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `News ${editingNews ? "updated" : "created"} successfully`,
        })
        fetchNews()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      image: newsItem.image,
      link: newsItem.link,
      size: newsItem.size,
      translations: newsItem.translations || {
        en: { title: newsItem.title, excerpt: newsItem.excerpt, content: newsItem.content },
        fr: { title: "", excerpt: "", content: "" },
        ar: { title: "", excerpt: "", content: "" },
      },
      isPublished: newsItem.isPublished,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:9000/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "News deleted successfully",
        })
        fetchNews()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      link: "",
      size: "medium",
      translations: {
        en: { title: "", excerpt: "", content: "" },
        fr: { title: "", excerpt: "", content: "" },
        ar: { title: "", excerpt: "", content: "" },
      },
      isPublished: true,
    })
    setEditingNews(null)
  }

  if (loading) {
    return <div>Loading news...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">News Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? "Edit News" : "Add New News"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="link">External Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNews ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{item.excerpt}</p>
                <p className="text-xs text-gray-500">Size: {item.size}</p>
                <p className="text-xs text-gray-500">
                  Published: {item.isPublished ? "Yes" : "No"}
                </p>
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}