"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Users, Calendar, Target, Award, TrendingUp, Globe, Gamepad2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Achievement {
  year: string
  title: string
  description: string
  category: "tournament" | "milestone" | "expansion"
}

interface GameStats {
  game: string
  rank: string
  winRate: string
  tournaments: number
  achievements: string[]
  players: string[]
}

export function AboutSection() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"history" | "stats" | "games">("history")

  const achievements: Achievement[] = [
    {
      year: "2018",
      title: "JSK Esports Founded",
      description: "Started as a small gaming community with a vision to compete at the highest level.",
      category: "milestone",
    },
    {
      year: "2019",
      title: "First Tournament Victory",
      description: "Won our first major tournament in Counter-Strike, establishing our competitive presence.",
      category: "tournament",
    },
    {
      year: "2020",
      title: "Multi-Game Expansion",
      description: "Expanded into League of Legends and Valorant, building championship-caliber rosters.",
      category: "expansion",
    },
    {
      year: "2021",
      title: "International Recognition",
      description: "Achieved top 3 finishes in multiple international tournaments across all games.",
      category: "tournament",
    },
    {
      year: "2022",
      title: "Training Facility Launch",
      description: "Opened state-of-the-art training facility with professional coaching staff.",
      category: "milestone",
    },
    {
      year: "2023",
      title: "World Championship",
      description: "Claimed our first world championship title in Valorant, cementing our elite status.",
      category: "tournament",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Established international partnerships and expanded to multiple regions.",
      category: "expansion",
    },
  ]

  const gameStats: GameStats[] = [
    {
      game: "Valorant",
      rank: "#1 Global",
      winRate: "87%",
      tournaments: 24,
      achievements: ["World Championship 2023", "Regional Champions", "Masters Winner"],
      players: ["Phoenix", "Sage", "Jett", "Sova", "Omen"],
    },
    {
      game: "League of Legends",
      rank: "#3 Regional",
      winRate: "78%",
      tournaments: 18,
      achievements: ["LCS Champions", "Worlds Semifinalists", "MSI Quarterfinalists"],
      players: ["MidKing", "ADCPro", "SupportGod", "JungleElite", "TopLaner"],
    },
    {
      game: "Counter-Strike 2",
      rank: "#2 Global",
      winRate: "82%",
      tournaments: 32,
      achievements: ["Major Champions", "ESL Pro League Winners", "BLAST Premier Champions"],
      players: ["IGL_Master", "AWP_Sniper", "Entry_Fragger", "Support_Player", "Lurker_Pro"],
    },
  ]

  const organizationStats = [
    { icon: Trophy, label: "Championships Won", value: "15+", color: "text-yellow-400" },
    { icon: Users, label: "Professional Players", value: "25+", color: "text-green-400" },
    { icon: Calendar, label: "Years of Excellence", value: "6+", color: "text-blue-400" },
    { icon: Globe, label: "Countries Represented", value: "12", color: "text-purple-400" },
    { icon: Target, label: "Tournament Win Rate", value: "82%", color: "text-red-400" },
    { icon: Award, label: "Major Titles", value: "8", color: "text-orange-400" },
  ]

  const getCategoryIcon = (category: Achievement["category"]) => {
    switch (category) {
      case "tournament":
        return <Trophy className="w-4 h-4 text-yellow-400" />
      case "milestone":
        return <Target className="w-4 h-4 text-green-400" />
      case "expansion":
        return <Globe className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">About JSK Esports</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-green-500">Legacy</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to world champions, JSK Esports has built a legacy of excellence, innovation, and
            competitive dominance across multiple gaming titles.
          </p>
        </motion.div>

        {/* Organization Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
        >
          {organizationStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
            {[
              { id: "history", label: "Our History", icon: Calendar },
              { id: "stats", label: "Statistics", icon: TrendingUp },
              { id: "games", label: "Game Stats", icon: Gamepad2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-green-500 text-black"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {activeTab === "history" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Our Journey to Excellence</h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Every champion has a story. Here's ours - from passionate gamers to world-class competitors.
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-green-500 via-green-400 to-green-500"></div>

                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          {getCategoryIcon(achievement.category)}
                          <span className="text-green-400 font-bold text-lg">{achievement.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                        <p className="text-gray-400 leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-black"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="md:col-span-2 lg:col-span-3 text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Performance Statistics</h3>
                <p className="text-gray-400 text-lg">
                  Numbers that showcase our competitive excellence and consistent performance.
                </p>
              </div>

              {organizationStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-green-500/50 transition-colors"
                >
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "games" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Game-Specific Performance</h3>
                <p className="text-gray-400 text-lg">
                  Detailed statistics and achievements across our competitive gaming titles.
                </p>
              </div>

              {gameStats.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-4">{game.game}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Global Rank:</span>
                          <span className="text-green-400 font-bold">{game.rank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Win Rate:</span>
                          <span className="text-green-400 font-bold">{game.winRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tournaments:</span>
                          <span className="text-white font-bold">{game.tournaments}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-white mb-4">Major Achievements</h5>
                      <div className="space-y-2">
                        {game.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-white mb-4">Active Roster</h5>
                      <div className="space-y-2">
                        {game.players.map((player, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{player}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
