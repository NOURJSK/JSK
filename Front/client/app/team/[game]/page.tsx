"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Gamepad2, ArrowLeft, Crown, Target, Zap, Trophy } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { apiService } from "@/lib/apiService"

interface Team {
  id: string
  name: string
  rank: string
  playerCount: number
  achievements: string[]
  translations: {
    en: { name: string; rank: string }
    fr: { name: string; rank: string }
    ar: { name: string; rank: string }
  }
  game: {
    id: string
    name: string
    logo: string
    character: string
    description: string
  }
  players: Array<{
    id: string
    name: string
    nickname: string
    role: string
    gender: string
    avatar: string
    rank: string
    kd: string
    winRate: string
    achievements: string[]
    bio: string
    translations: {
      en: { name: string; role: string; bio: string }
      fr: { name: string; role: string; bio: string }
      ar: { name: string; role: string; bio: string }
    }
  }>
}

export default function TeamPage() {
  const params = useParams()
  const { t, language } = useLanguage()
  const [genderFilter, setGenderFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  const gameKey = params.game as string


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await apiService.getTeamsByGame(gameKey)
        setTeams(data)
      } catch (error) {
        console.error('Failed to fetch teams:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [gameKey])

  const getLocalizedContent = (item: any) => {
    if (item.translations && item.translations[language]) {
      return {
        name: item.translations[language].name || item.name,
        role: item.translations[language].role || item.role,
        bio: item.translations[language].bio || item.bio,
      }
    }
    return {
      name: item.name,
      role: item.role,
      bio: item.bio,
    }
  }

  const genders = ["All", "Male", "Female"]
  const types = ["All", "player", "coach", "manager"]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!teams.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No teams found for this game</h1>
          <Link href="/#disciplines">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const team = teams[0] // For now, show the first team
  const filteredMembers = team.players.filter((member) => {
    const genderMatch = genderFilter === "All" || member.gender === genderFilter
    // For now, treat all as players since we don't have type field
    const typeMatch = typeFilter === "All" || typeFilter === "player"
    return genderMatch && typeMatch
  })

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={team.logo || "/placeholder.svg"}
              alt={team.name}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <Link href="/#disciplines">
                <Button variant="ghost" className="mb-4 text-primary hover:text-primary/80">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Teams
                </Button>
              </Link>
              <h1 className="text-5xl font-bold font-sans mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                {team.game.name} <span className="text-white">Squad</span>
              </h1>
              <p className="text-xl text-muted-foreground font-serif mb-6">{team.game.description}</p>
              <div className="flex flex-wrap gap-2">
                {(team.achievements || []).map((achievement, index) => (
  <Badge key={index} variant="secondary" className="bg-primary/20 text-primary flex items-center">
    <Trophy className="w-3 h-3 mr-1" />
    {achievement}
  </Badge>
))}

              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-wrap gap-2 bg-background/80 p-4 rounded-lg border border-primary/20 shadow-lg">
                <span className="text-sm font-medium text-primary font-serif mr-2 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Gender:
                </span>
                {genders.map((gender) => (
                  <Button
                    key={gender}
                    variant={genderFilter === gender ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGenderFilter(gender)}
                    className="font-serif transition-all"
                  >
                    {gender}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 bg-background/80 p-4 rounded-lg border border-primary/20 shadow-lg">
                <span className="text-sm font-medium text-primary font-serif mr-2 flex items-center">
                  <Gamepad2 className="w-4 h-4 mr-1" />
                  Role:
                </span>
                {types.map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                    className="font-serif capitalize transition-all"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Members - NEW ANIMATED DESIGN */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-gray-900 overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                >
                  {/* Card Background & Image */}
                  <div className="relative h-[500px] overflow-hidden">
                    {/* Player Image */}
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={getLocalizedContent(member).name}
                      className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Role Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-green-500 text-black px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
                        {getLocalizedContent(member).role}
                      </div>
                    </div>

                    {/* Game Logo/Identifier */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-black/60 backdrop-blur-sm px-4 py-2">
                        <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
                          {team.game.name}
                        </span>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      {/* Real Name (default state) */}
                      <div className="transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-4">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {getLocalizedContent(member).name}
                        </h3>
                        <p className="text-gray-300 text-sm uppercase tracking-wider">Player</p>
                      </div>

                     {/* Nickname (hover state) */}
<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-4 
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
  <div className="text-center">
    <h3
      className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase 
                 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 
                 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
    >
      {member.nickname}
    </h3>
                          <div className="flex justify-center items-center space-x-4 text-sm">
                            {member.rank && (
                              <span className="bg-green-500/20 text-green-400 px-4 py-2 border border-green-500/30">
                                {member.rank}
                              </span>
                            )}
                            {member.winRate && (
                              <span className="text-gray-300">
                                WR: {member.winRate}
                              </span>
                            )}
                            {member.kd && (
                              <span className="text-gray-300">
                                K/D: {member.kd}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 border-2 border-green-500/0 group-hover:border-green-500/50 transition-all duration-500"></div>
                  </div>

                  
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}