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

interface Tournament {
  id: string
  name: string
  game: string
  date: string
  location: string
  status: string
  prize: string
  teams: number
  description: string
  translations: {
    en: { name: string; location: string; description: string }
    fr: { name: string; location: string; description: string }
    ar: { name: string; location: string; description: string }
  }
}

export function TournamentsManager() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    game: "",
    date: "",
    location: "",
    status: "Upcoming",
    prize: "",
    teams: 0,
    description: "",
    translations: {
      en: { name: "", location: "", description: "" },
      fr: { name: "", location: "", description: "" },
      ar: { name: "", location: "", description: "" },
    },
  })

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const response = await fetch("http://localhost:9000/tournaments")
      const data = await response.json()
      setTournaments(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tournaments",
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
      const url = editingTournament
        ? `http://localhost:9000/tournaments/${editingTournament.id}`
        : "http://localhost:9000/tournaments"
      
      const response = await fetch(url, {
        method: editingTournament ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Tournament ${editingTournament ? "updated" : "created"} successfully`,
        })
        fetchTournaments()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save tournament",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      game: "",
      date: "",
      location: "",
      status: "Upcoming",
      prize: "",
      teams: 0,
      description: "",
      translations: {
        en: { name: "", location: "", description: "" },
        fr: { name: "", location: "", description: "" },
        ar: { name: "", location: "", description: "" },
      },
    })
    setEditingTournament(null)
  }

  if (loading) {
    return <div>Loading tournaments...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Tournaments Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tournament
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTournament ? "Edit Tournament" : "Add New Tournament"}</DialogTitle>
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
                  <Label htmlFor="game">Game</Label>
                  <Input
                    id="game"
                    value={formData.game}
                    onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Champions">Champions</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="teams">Teams Count</Label>
                  <Input
                    id="teams"
                    type="number"
                    value={formData.teams}
                    onChange={(e) => setFormData({ ...formData, teams: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prize">Prize Pool</Label>
                  <Input
                    id="prize"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
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
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTournament ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tournament.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(tournament)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(tournament.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Game:</strong> {tournament.game}</p>
                <p className="text-sm"><strong>Date:</strong> {new Date(tournament.date).toLocaleDateString()}</p>
                <p className="text-sm"><strong>Location:</strong> {tournament.location}</p>
                <p className="text-sm"><strong>Status:</strong> {tournament.status}</p>
                <p className="text-sm"><strong>Prize:</strong> {tournament.prize}</p>
                <p className="text-sm"><strong>Teams:</strong> {tournament.teams}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}