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

interface About {
  id: string
  section: string
  title: string
  content: string
  image: string
  stats: Array<{
    value: string
    label: string
    icon: string
  }>
  translations: {
    en: { title: string; content: string }
    fr: { title: string; content: string }
    ar: { title: string; content: string }
  }
}

export function AboutManager() {
  const [aboutItems, setAboutItems] = useState<About[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAbout, setEditingAbout] = useState<About | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<About, "id">>({
    section: "hero",
    title: "",
    content: "",
    image: "",
    stats: [],
    translations: {
      en: { title: "", content: "" },
      fr: { title: "", content: "" },
      ar: { title: "", content: "" },
    },
  })

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch("http://localhost:9000/about")
      const data = await response.json()
      setAboutItems(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch about content",
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
      const url = editingAbout
        ? `http://localhost:9000/about/${editingAbout.id}`
        : "http://localhost:9000/about"
      
      const response = await fetch(url, {
        method: editingAbout ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `About content ${editingAbout ? "updated" : "created"} successfully`,
        })
        fetchAbout()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about content",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      section: "hero",
      title: "",
      content: "",
      image: "",
      stats: [],
      translations: {
        en: { title: "", content: "" },
        fr: { title: "", content: "" },
        ar: { title: "", content: "" },
      },
    })
    setEditingAbout(null)
  }

  if (loading) {
    return <div>Loading about content...</div>
  }

  async function handleDelete(id: string): Promise<void> {
    const token = localStorage.getItem("token")
    if (!window.confirm("Are you sure you want to delete this about content?")) return

    try {
      const response = await fetch(`http://localhost:9000/about/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        toast({
          title: "Deleted",
          description: "About content deleted successfully",
        })
        fetchAbout()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete about content",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete about content",
        variant: "destructive",
      })
    }
  }
  function handleEdit(item: About): void {
    setEditingAbout(item)
    setFormData({
      section: item.section,
      title: item.title,
      content: item.content,
      image: item.image,
      stats: item.stats || [],
      translations: item.translations || {
        en: { title: "", content: "" },
        fr: { title: "", content: "" },
        ar: { title: "", content: "" },
      },
    })
    setIsDialogOpen(true)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">About Content Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add About Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAbout ? "Edit About Content" : "Add New About Content"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select value={formData.section} onValueChange={(value) => setFormData({ ...formData, section: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="vision">Vision</SelectItem>
                      <SelectItem value="values">Values</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
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

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAbout ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{item.title}</CardTitle>
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
                <p className="text-sm"><strong>Section:</strong> {item.section}</p>
                <p className="text-sm">{item.content.substring(0, 100)}...</p>
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