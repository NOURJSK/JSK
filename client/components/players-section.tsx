"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Zap, Users, Star, Award, Gamepad2 } from "lucide-react"

const players = [
  {
    id: 1,
    name: "Alex 'Phoenix' Chen",
    role: "IGL/Duelist",
    game: "Valorant",
    gender: "Male",
    avatar: "/professional-male-gamer-with-headset-phoenix-style.png",
    rank: "Radiant",
    kd: "1.45",
    winRate: "78%",
    achievements: ["Regional Champion 2024", "MVP Spring Split", "Ace Master"],
    bio: "Professional Valorant player with 5+ years of competitive experience. Known for exceptional game sense and clutch plays.",
    socials: { twitter: "@phoenix_jsk", twitch: "phoenix_valorant" },
    highlights: "/placeholder.mp4?query=valorant gameplay highlights phoenix player",
  },
  {
    id: 2,
    name: "Sarah 'Viper' Johnson",
    role: "Controller",
    game: "Valorant",
    gender: "Female",
    avatar: "/professional-female-gamer-with-gaming-headset-vipe.png",
    rank: "Radiant",
    kd: "1.32",
    winRate: "82%",
    achievements: ["Best Controller 2024", "Team Captain", "Strategy Master"],
    bio: "Strategic mastermind specializing in map control and team coordination. Leading JSK to multiple victories.",
    socials: { twitter: "@viper_jsk", twitch: "viper_gaming" },
    highlights: "/placeholder.mp4?query=valorant controller gameplay viper smokes",
  },
  {
    id: 3,
    name: "Marcus 'Shadow' Williams",
    role: "ADC",
    game: "League of Legends",
    gender: "Male",
    avatar: "/professional-male-gamer-league-of-legends-adc-play.png",
    rank: "Challenger",
    kd: "3.2",
    winRate: "75%",
    achievements: ["Pentakill Master", "Regional Finals MVP", "Rookie of the Year"],
    bio: "Rising star in League of Legends with incredible mechanical skills and game knowledge.",
    socials: { twitter: "@shadow_jsk", twitch: "shadow_lol" },
    highlights: "/placeholder.mp4?query=league of legends adc pentakill highlights",
  },
  {
    id: 4,
    name: "Emma 'Frost' Davis",
    role: "Support",
    game: "League of Legends",
    gender: "Female",
    avatar: "/professional-female-gamer-league-of-legends-suppor.png",
    rank: "Challenger",
    kd: "0.8",
    winRate: "80%",
    achievements: ["Best Support 2024", "Vision Control Expert", "Team Synergy Award"],
    bio: "Master of vision control and team fights. Essential backbone of our League of Legends roster.",
    socials: { twitter: "@frost_jsk", twitch: "frost_support" },
    highlights: "/placeholder.mp4?query=league of legends support gameplay highlights",
  },
  {
    id: 5,
    name: "Jake 'Rocket' Thompson",
    role: "Striker",
    game: "Rocket League",
    gender: "Male",
    avatar: "/professional-male-gamer-rocket-league-player.png",
    rank: "Grand Champion",
    kd: "2.1",
    winRate: "73%",
    achievements: ["Aerial Master", "Speed Demon", "Clutch King"],
    bio: "Rocket League prodigy known for incredible aerial plays and game-winning goals.",
    socials: { twitter: "@rocket_jsk", twitch: "rocket_rl" },
    highlights: "/placeholder.mp4?query=rocket league aerial goals highlights",
  },
  {
    id: 6,
    name: "Zoe 'Storm' Martinez",
    role: "Entry Fragger",
    game: "CS2",
    gender: "Female",
    avatar: "/professional-female-gamer-counter-strike-player.png",
    rank: "Global Elite",
    kd: "1.67",
    winRate: "76%",
    achievements: ["Headshot Queen", "Clutch Master", "First Blood Expert"],
    bio: "Aggressive entry fragger with pinpoint accuracy and fearless playstyle in Counter-Strike 2.",
    socials: { twitter: "@storm_jsk", twitch: "storm_cs2" },
    highlights: "/placeholder.mp4?query=counter strike 2 headshot highlights",
  },
]

export function PlayersSection() {
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [gameFilter, setGameFilter] = useState("All")
  const [genderFilter, setGenderFilter] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  const games = ["All", ...new Set(players.map((p) => p.game))]
  const genders = ["All", "Male", "Female"]

  const filteredPlayers = players.filter((player) => {
    const gameMatch = gameFilter === "All" || player.game === gameFilter
    const genderMatch = genderFilter === "All" || player.gender === genderFilter
    return gameMatch && genderMatch
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("players")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="players" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="/gaming-tournament-arena-with-multiple-screens-and-.png" alt="Gaming Arena Background" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-4 animate-neon-flicker">
            Our <span className="text-primary">Elite Players</span>
          </h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Meet the talented individuals who make JSK Esports a championship team
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-reveal">
          <div className="flex flex-wrap gap-2 backdrop-blur-sm bg-background/10 p-4 rounded-lg border border-primary/20">
            <span className="text-sm font-medium text-primary font-serif mr-2 flex items-center">
              <Gamepad2 className="w-4 h-4 mr-1" />
              Game:
            </span>
            {games.map((game) => (
              <Button
                key={game}
                variant={gameFilter === game ? "default" : "outline"}
                size="sm"
                onClick={() => setGameFilter(game)}
                className="font-serif animate-card-hover"
              >
                {game}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 backdrop-blur-sm bg-background/10 p-4 rounded-lg border border-primary/20">
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
                className="font-serif animate-card-hover"
              >
                {gender}
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlayers.map((player, index) => (
            <Card
              key={player.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal cursor-pointer bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 animate-card-hover overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPlayer(player)}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={player.avatar || "/placeholder.svg"}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="font-serif bg-primary/80 text-primary-foreground">
                      {player.game}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold font-sans text-xl group-hover:text-primary transition-colors animate-neon-flicker">
                      {player.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-serif">{player.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="backdrop-blur-sm bg-primary/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-primary font-sans animate-neon-flicker">{player.rank}</div>
                      <div className="text-xs text-muted-foreground font-serif">Rank</div>
                    </div>
                    <div className="backdrop-blur-sm bg-primary/10 p-3 rounded-lg">
                      <div
                        className="text-lg font-bold text-primary font-sans animate-neon-flicker"
                        style={{ animationDelay: "0.2s" }}
                      >
                        {player.kd}
                      </div>
                      <div className="text-xs text-muted-foreground font-serif">K/D</div>
                    </div>
                    <div className="backdrop-blur-sm bg-primary/10 p-3 rounded-lg">
                      <div
                        className="text-lg font-bold text-primary font-sans animate-neon-flicker"
                        style={{ animationDelay: "0.4s" }}
                      >
                        {player.winRate}
                      </div>
                      <div className="text-xs text-muted-foreground font-serif">Win Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Player Detail Modal */}
        <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
          <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-primary/30">
            {selectedPlayer && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-sans text-3xl animate-neon-flicker">Player Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Enhanced Header */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <img
                        src={selectedPlayer.avatar || "/placeholder.svg"}
                        alt={selectedPlayer.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg"></div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold font-sans animate-neon-flicker">{selectedPlayer.name}</h3>
                        <p className="text-xl text-muted-foreground font-serif">{selectedPlayer.role}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="font-serif bg-primary/80 text-primary-foreground">
                            {selectedPlayer.game}
                          </Badge>
                          <Badge variant="outline" className="font-serif border-primary/50">
                            {selectedPlayer.gender}
                          </Badge>
                        </div>
                      </div>

                      <div className="relative">
                        <video className="w-full h-32 object-cover rounded-lg" autoPlay muted loop playsInline>
                          <source src={selectedPlayer.highlights} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-2">
                            <Trophy className="w-6 h-6 text-primary-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm">
                      <TabsTrigger value="stats" className="font-serif">
                        <Target className="w-4 h-4 mr-2" />
                        Stats
                      </TabsTrigger>
                      <TabsTrigger value="achievements" className="font-serif">
                        <Award className="w-4 h-4 mr-2" />
                        Achievements
                      </TabsTrigger>
                      <TabsTrigger value="bio" className="font-serif">
                        <Star className="w-4 h-4 mr-2" />
                        Bio
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="stats" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 animate-card-hover">
                          <Target className="w-8 h-8 text-primary animate-pulse-glow" />
                          <div>
                            <div className="text-2xl font-bold font-sans animate-neon-flicker">
                              {selectedPlayer.rank}
                            </div>
                            <div className="text-sm text-muted-foreground font-serif">Current Rank</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 animate-card-hover">
                          <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
                          <div>
                            <div
                              className="text-2xl font-bold font-sans animate-neon-flicker"
                              style={{ animationDelay: "0.2s" }}
                            >
                              {selectedPlayer.kd}
                            </div>
                            <div className="text-sm text-muted-foreground font-serif">K/D Ratio</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 animate-card-hover">
                          <Trophy className="w-8 h-8 text-primary animate-pulse-glow" />
                          <div>
                            <div
                              className="text-2xl font-bold font-sans animate-neon-flicker"
                              style={{ animationDelay: "0.4s" }}
                            >
                              {selectedPlayer.winRate}
                            </div>
                            <div className="text-sm text-muted-foreground font-serif">Win Rate</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 animate-card-hover">
                          <Users className="w-8 h-8 text-primary animate-pulse-glow" />
                          <div>
                            <div
                              className="text-2xl font-bold font-sans animate-neon-flicker"
                              style={{ animationDelay: "0.6s" }}
                            >
                              {selectedPlayer.game}
                            </div>
                            <div className="text-sm text-muted-foreground font-serif">Main Game</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-3">
                      {selectedPlayer.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 animate-card-hover"
                        >
                          <Trophy className="w-5 h-5 text-primary animate-pulse-glow" />
                          <span className="font-serif">{achievement}</span>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="bio" className="space-y-4">
                      <div className="p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20">
                        <p className="text-muted-foreground font-serif leading-relaxed">{selectedPlayer.bio}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold font-sans text-primary">Social Media</h4>
                        <div className="flex gap-4">
                          <Badge variant="outline" className="font-serif border-primary/50 animate-card-hover">
                            Twitter: {selectedPlayer.socials.twitter}
                          </Badge>
                          <Badge variant="outline" className="font-serif border-primary/50 animate-card-hover">
                            Twitch: {selectedPlayer.socials.twitch}
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
