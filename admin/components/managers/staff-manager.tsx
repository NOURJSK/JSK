
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
import { useDropzone } from "react-dropzone"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Staff {
  id: string
  name: string
  role: string
  avatar: string
  description: string
  level: number
  experience: string
  achievements: string[]
  translations: {
    en: { name: string; role: string; description: string }
    fr: { name: string; role: string; description: string }
    ar: { name: string; role: string; description: string }
  }
}

export function StaffManager() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  const [formData, setFormData] = useState<Omit<Staff, "id">>({
    name: "",
    role: "",
    avatar: "",
    description: "",
    level: 1,
    experience: "",
    achievements: [],
    translations: {
      en: { name: "", role: "", description: "" },
      fr: { name: "", role: "", description: "" },
      ar: { name: "", role: "", description: "" },
    },
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const res = await fetch("http://localhost:9000/staff")
      const data = await res.json()
      setStaff(data)
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch staff", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (member: Staff) => {
    setEditingStaff(member)
    setFormData({
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      description: member.description,
      level: member.level,
      experience: member.experience,
      achievements: member.achievements || [],
      translations: member.translations || {
        en: { name: member.name, role: member.role, description: member.description },
        fr: { name: "", role: "", description: "" },
        ar: { name: "", role: "", description: "" },
      },
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:9000/staff/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        toast({ title: "Success", description: "Staff member deleted successfully" })
        fetchStaff()
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete staff member", variant: "destructive" })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      avatar: "",
      description: "",
      level: 1,
      experience: "",
      achievements: [],
      translations: {
        en: { name: "", role: "", description: "" },
        fr: { name: "", role: "", description: "" },
        ar: { name: "", role: "", description: "" },
      },
    })
    setEditingStaff(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const url = editingStaff
        ? `http://localhost:9000/staff/${editingStaff.id}`
        : "http://localhost:9000/staff"

      const res = await fetch(url, {
        method: editingStaff ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast({ title: "Success", description: `Staff ${editingStaff ? "updated" : "created"} successfully` })
        fetchStaff()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to save staff", variant: "destructive" })
    }
  }

  // Drag & Drop for avatar inside form
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      const data = new FormData()
      data.append("file", file)
      const res = await fetch("http://localhost:9000/staff/upload", { method: "POST", body: data })
      const json = await res.json()
      // Correctly construct the URL using the returned filename
      setFormData({ ...formData, avatar: json.filename })
    },
  })

  if (loading) return <div>Loading staff...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Staff Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" /> Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level.toString()} onValueChange={(value) => setFormData({ ...formData, level: parseInt(value) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Management</SelectItem>
                      <SelectItem value="2">Level 2 - Game Managers</SelectItem>
                      <SelectItem value="3">Level 3 - Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input id="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                </div>
              </div>

              <div>
                <Label>Avatar</Label>
                <div {...getRootProps()} className="cursor-pointer w-24 h-24 border rounded flex items-center justify-center overflow-hidden">
                  <input {...getInputProps()} />
                  {formData.avatar ? (
                    <img src={`http://localhost:9000/uploads/${formData.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-muted-foreground">Click or Drop Image</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingStaff ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{member.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(member)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  {member.avatar ? (
                    <AvatarImage src={`http://localhost:9000/uploads/${member.avatar}`} alt={member.name} />
                  ) : (
                    <AvatarFallback>{member.name.split(" ")[0][0]}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm"><strong>Role:</strong> {member.role}</p>
                  <p className="text-sm"><strong>Level:</strong> {member.level}</p>
                  <p className="text-sm"><strong>Experience:</strong> {member.experience}</p>
                </div>
              </div>
              <p className="text-sm">{member.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
