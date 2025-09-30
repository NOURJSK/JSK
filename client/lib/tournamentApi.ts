import { apiService } from "./apiService"

const mockTournaments = [
  { id: 1, name: "World Championship 2024", game: "Valorant", date: "2024-03-15", prize: "$1,000,000", status: "upcoming", location: "Los Angeles, CA" },
  { id: 2, name: "Regional Masters", game: "League of Legends", date: "2024-02-20", prize: "$250,000", status: "ongoing", location: "Online" },
  { id: 3, name: "Winter Invitational", game: "Counter-Strike 2", date: "2023-12-10", prize: "$500,000", status: "completed", location: "Berlin, Germany", result: "1st Place" },
]

export const tournamentApi = {
  getAll: async () => {
    try {
      return await apiService.get("/api/tournaments")
    } catch {
      console.warn("API not available, using mock tournaments")
      return mockTournaments
    }
  },
}
