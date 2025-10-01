import { apiService } from "./apiService"

const mockNews = [
  {
    id: 1,
    title: "JSK Esports Wins Championship",
    excerpt: "Our team dominated the finals with incredible plays and strategic excellence.",
    content: "In an epic showdown that lasted over 3 hours, JSK Esports proved why they're elite...",
    image: "/esports-championship-victory.jpg",
    date: "2024-01-15",
    author: "JSK Media Team",
    category: "Tournament",
  },
  {
    id: 2,
    title: "New Player Joins JSK Roster",
    excerpt: "Welcome our newest team member who brings incredible skill and experience.",
    content: "We're excited to announce the addition of a world-class player to our roster...",
    image: "/professional-gamer-portrait.png",
    date: "2024-01-10",
    author: "JSK Management",
    category: "Team",
  },
  {
    id: 3,
    title: "Training Facility Upgrade",
    excerpt: "State-of-the-art equipment and facilities to enhance our competitive edge.",
    content: "Our new training facility features the latest gaming technology and equipment...",
    image: "/gaming-training-facility.jpg",
    date: "2024-01-05",
    author: "JSK Operations",
    category: "Facility",
  },
]

export const newsApi = {
  getAll: async () => {
    try {
      return await apiService.get("/api/news")
    } catch {
      console.warn("API not available, using mock news")
      return mockNews
    }
  },

  getById: async (id: number) => {
    try {
      return await apiService.get(`/api/news/${id}`)
    } catch {
      console.warn("API not available, using mock news")
      const article = mockNews.find((n) => n.id === id)
      if (!article) throw new Error("Article not found")
      return article
    }
  },
}
