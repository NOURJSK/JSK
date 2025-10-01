"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Move } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Game {
  id: string
  name: string
  slug: string
  logo: string
  character: string
  description: string
  translations: {
    en: { name: string; description: string }
    fr: { name: string; description: string }
    ar: { name: string; description: string }
  }
  isActive: boolean
}

interface SortableCardProps {
  game: Game
  handleEdit: (game: Game) => void
  handleDelete: (id: string) => void
}

function SortableCard({ game, handleEdit, handleDelete }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: game.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="relative">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{game.name}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(game)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(game.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              {/* Drag handle */}
              <div {...listeners} {...attributes} className="cursor-grab p-1">
                <Move className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Slug: {game.slug}</p>
            <p className="text-sm">{game.description}</p>
            {game.logo && (
              <img src={game.logo} alt={game.name} className="w-16 h-16 object-contain" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function GamesManager() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logo: "",
    character: "",
    description: "",
    translations: {
      en: { name: "", description: "" },
      fr: { name: "", description: "" },
      ar: { name: "", description: "" },
    },
  })

  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:9000/games")
      const data = await response.json()
      setGames(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch games",
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
      const url = editingGame
        ? `http://localhost:9000/games/${editingGame.id}`
        : "http://localhost:9000/games"

      const response = await fetch(url, {
        method: editingGame ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Game ${editingGame ? "updated" : "created"} successfully`,
        })
        fetchGames()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save game",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (game: Game) => {
    setEditingGame(game)
    setFormData({
      name: game.name,
      slug: game.slug,
      logo: game.logo,
      character: game.character,
      description: game.description,
      translations: game.translations || {
        en: { name: game.name, description: game.description },
        fr: { name: "", description: "" },
        ar: { name: "", description: "" },
      },
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:9000/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Game deleted successfully",
        })
        fetchGames()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete game",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      logo: "",
      character: "",
      description: "",
      translations: {
        en: { name: "", description: "" },
        fr: { name: "", description: "" },
        ar: { name: "", description: "" },
      },
    })
    setEditingGame(null)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = games.findIndex((g) => g.id === active.id)
      const newIndex = games.findIndex((g) => g.id === over.id)
      setGames(arrayMove(games, oldIndex, newIndex))
    }
  }

  if (loading) return <div>Loading games...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Games Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingGame ? "Edit Game" : "Add New Game"}</DialogTitle>
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
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
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
                  <Label htmlFor="character">Character Image URL</Label>
                  <Input
                    id="character"
                    value={formData.character}
                    onChange={(e) => setFormData({ ...formData, character: e.target.value })}
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

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Translations</h3>
                {["en", "fr", "ar"].map((lang) => (
                  <div key={lang} className="space-y-2">
                    <h4 className="font-medium">{lang.toUpperCase()}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name ({lang})</Label>
                        <Input
                          value={"formData.translations[lang]".name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              translations: {
                                ...formData.translations,
                                [lang]: {
                                  ...formData.translations[lang],
                                  name: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Description ({lang})</Label>
                        <Input
                          value={formData.translations[lang].description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              translations: {
                                ...formData.translations,
                                [lang]: {
                                  ...formData.translations[lang],
                                  description: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingGame ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={games.map((g) => g.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <SortableCard
                key={game.id}
                game={game}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
