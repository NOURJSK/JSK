import { apiService } from "./apiService"

const mockGames = [
  {
    id: 1,
    name: "Valorant",
    description: "Tactical FPS where precise gunplay meets unique agent abilities.",
    image: "/valorant-esports-team.jpg",
    players: ["Player1", "Player2", "Player3", "Player4", "Player5"],
    achievements: ["World Championship 2023", "Regional Champions"],
    rank: "#1 Global",
  },
  {
    id: 2,
    name: "League of Legends",
    description: "Strategic MOBA with intense team-based gameplay.",
    image: "/league-of-legends-esports.jpg",
    players: ["MidLaner", "ADC", "Support", "Jungler", "TopLaner"],
    achievements: ["LCS Champions", "Worlds Semifinalists"],
    rank: "#3 Regional",
  },
  {
    id: 3,
    name: "Counter-Strike 2",
    description: "Classic tactical shooter requiring precision and teamwork.",
    image: "/counter-strike-esports.jpg",
    players: ["IGL", "AWPer", "Entry", "Support", "Lurker"],
    achievements: ["Major Champions", "ESL Pro League Winners"],
    rank: "#2 Global",
  },
]

export const gamesApi = {
  getAll: async () => {
    try {
      return await apiService.get("/api/games")
    } catch {
      console.warn("API not available, using mock games")
      return mockGames
    }
  },
}
