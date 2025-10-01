"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { gamesApi } from "@/lib/gamesApi" 
import { Link } from "lucide-react"

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
  teams: any[]
}

export function GamesSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesApi.getAll() // ✅ Use modular API
        setGames(data)
      } catch (error) {
        console.error("Failed to fetch games:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const getLocalizedContent = (game: Game) => {
    if (game.translations && game.translations[language]) {
      return {
        name: game.translations[language].name || game.name,
        description: game.translations[language].description || game.description,
      }
    }
    return {
      name: game.name,
      description: game.description,
    }
  }

  if (loading) {
    return (
      <section id="disciplines" className="py-32 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-white mt-4">Loading games...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="disciplines" className="py-32 relative overflow-hidden bg-black">
      {/* ...rest of your UI remains unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game, index) => {
          const localizedContent = getLocalizedContent(game)
          return (
            <Link key={game.id} href={`/team/${game.slug}`}>
              <div
                className="group relative aspect-[4/5] overflow-hidden bg-black cursor-pointer transition-all duration-700 hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={game.character || "/placeholder.svg?height=400&width=320&query=esports game character"}
                    alt={`${game.name} character`}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#427E17]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="mb-4 flex justify-center">
                      <img
                        src={game.logo || "/placeholder.svg?height=60&width=60&query=game logo"}
                        alt={game.name}
                        className="w-16 h-16 object-contain filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#427E17] transition-colors duration-500 text-center mb-2 tracking-wide">
                      {localizedContent.name.toUpperCase()}
                    </h3>

                    <p className="text-xs font-medium text-gray-400 group-hover:text-[#427E17] transition-colors duration-500 text-center uppercase tracking-widest mb-4">
                      {localizedContent.description}
                    </p>

                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <div className="bg-[#427E17] text-white px-4 py-2 text-sm font-medium text-center uppercase tracking-wide">
                        View Team
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border border-gray-800 group-hover:border-[#427E17]/50 group-hover:shadow-[0_0_20px_rgba(66,126,23,0.3)] transition-all duration-700"></div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
