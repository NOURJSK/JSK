"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Trophy, Users, ExternalLink } from "lucide-react"
import { tournamentsApi } from "@/lib/tournamentsApi"
import { useLanguage } from "@/lib/language-context"

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

export function TournamentsSection() {
  const { language } = useLanguage()
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await tournamentsApi.getTournaments()
        setTournaments(data)
      } catch (error) {
        console.error('Failed to fetch tournaments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  const getLocalizedContent = (tournament: Tournament) => {
    if (tournament.translations && tournament.translations[language]) {
      return {
        name: tournament.translations[language].name || tournament.name,
        location: tournament.translations[language].location || tournament.location,
        description: tournament.translations[language].description || tournament.description,
      }
    }
    return {
      name: tournament.name,
      location: tournament.location,
      description: tournament.description,
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Champions":
        return "bg-primary text-primary-foreground"
      case "Qualified":
        return "bg-secondary text-secondary-foreground"
      case "Upcoming":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (loading) {
    return (
      <section id="tournaments" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-foreground mt-4">Loading tournaments...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tournaments" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-4">
            <span className="text-primary">Tournaments</span> & Events
          </h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Follow our journey through major competitions and championships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tournaments.map((tournament, index) => {
  const localizedContent = getLocalizedContent(tournament)
  return (
    <Card
      key={tournament.id}
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 scroll-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="font-serif">
            {tournament.game}
          </Badge>
          <Badge className={`${getStatusColor(tournament.status)} font-serif`}>
            {tournament.status}
          </Badge>
        </div>
        <CardTitle className="font-sans group-hover:text-primary transition-colors">
          {localizedContent.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground font-serif text-sm leading-relaxed">
          {localizedContent.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground font-serif">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            {new Date(tournament.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex items-center text-sm text-muted-foreground font-serif">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            {localizedContent.location}
          </div>

          <div className="flex items-center text-sm text-muted-foreground font-serif">
            <Trophy className="w-4 h-4 mr-2 text-primary" />
            Prize Pool: {tournament.prize}
          </div>

          <div className="flex items-center text-sm text-muted-foreground font-serif">
            <Users className="w-4 h-4 mr-2 text-primary" />
            {tournament.teams} Teams
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-serif bg-transparent"
        >
          View Details
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
})}

        </div>

        <div className="text-center mt-12 scroll-reveal">
          <Button size="lg" className="font-serif">
            View All Tournaments
          </Button>
        </div>
      </div>
    </section>
  )
}
