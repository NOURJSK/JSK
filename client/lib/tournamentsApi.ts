// lib/tournamentsApi.ts
import { apiService } from "./apiService"

export const tournamentsApi = {
  getTournaments: async () => {
    try {
      return await apiService.get("/api/tournaments")
    } catch (error) {
      console.warn("API not available, returning mock tournaments")
      return [
        {
          id: "1",
          name: "World Championship 2024",
          game: "Valorant",
          date: "2024-03-15",
          prize: "$1,000,000",
          status: "upcoming",
          description: "The biggest tournament of the year featuring the world's best teams.",
          location: "Los Angeles, CA"
        },
        {
          id: "2",
          name: "Regional Masters",
          game: "League of Legends",
          date: "2024-02-20",
          prize: "$250,000",
          status: "ongoing",
          description: "Regional championship determining worlds qualification.",
          location: "Online"
        },
        {
          id: "3",
          name: "Winter Invitational",
          game: "Counter-Strike 2",
          date: "2023-12-10",
          prize: "$500,000",
          status: "completed",
          description: "Elite invitational tournament with top 8 teams worldwide.",
          location: "Berlin, Germany",
          result: "1st Place"
        }
      ]
    }
  }
}
