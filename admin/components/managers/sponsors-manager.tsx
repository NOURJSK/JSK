"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Sponsor {
  id: string
  name: string
  logo: string
  url: string
  description: string
  order: number
  translations: {
    en: { name: string; description: string }
    fr: { name: string; description: string }
    ar: { name: string; description: string }
  }
}

export function SponsorsManager() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
    description: "",
    order: 0,
    translations: {
      en: { name: "", description: "" },
      fr: { name: "", description: "" },
      ar: { name: "", description: "" },
    },
  })

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      const response = await fetch("http://localhost:9000/sponsors")
      const data = await response.json()
      setSponsors(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sponsors",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor)
    setFormData({
      name: sponsor.name,
      logo: sponsor.logo,
      url: sponsor.url,
      description: sponsor.description,
      order: sponsor.order,
      translations: sponsor.translations,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!confirm("Are you sure you want to delete this sponsor?")) return

    try {
      const response = await fetch(`http://localhost:9000/sponsors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast({
          title: "Deleted",
          description: "Sponsor deleted successfully",
        })
        fetchSponsors()
      } else {
        throw new Error("Failed to delete")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sponsor",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      const url = editingSponsor
        ? `http://localhost:9000/sponsors/${editingSponsor.id}`
        : "http://localhost:9000/sponsors"

      const response = await fetch(url, {
        method: editingSponsor ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Sponsor ${editingSponsor ? "updated" : "created"} successfully`,
        })
        fetchSponsors()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save sponsor",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      url: "",
      description: "",
      order: 0,
      translations: {
        en: { name: "", description: "" },
        fr: { name: "", description: "" },
        ar: { name: "", description: "" },
      },
    })
    setEditingSponsor(null)
  }

  if (loading) {
    return <div>Loading sponsors...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Sponsors Management</h2>

        {/* ✅ Dialog Root gets onOpenChange */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingSponsor ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{sponsor.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(sponsor)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(sponsor.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">Order: {sponsor.order}</p>
                <p className="text-sm">{sponsor.description}</p>
                {sponsor.logo && (
                  <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 object-contain" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
