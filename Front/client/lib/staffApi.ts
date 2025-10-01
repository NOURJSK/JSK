// lib/staffApi.ts
import { apiService } from "./apiService"

export const staffApi = {
  getStaff: async () => {
    try {
      return await apiService.get("/api/staff") // backend endpoint
    } catch (error) {
      console.warn("API not available, returning mock staff data")
      return [
        {
          id: "1",
          name: "Alex Chen",
          role: "Head Coach",
          avatar: "esports-coach-professional.jpg",
          description: "Former professional player with 8+ years of competitive experience.",
          level: 1,
          experience: "8 years",
          achievements: ["World Championship 2023"],
          translations: {
            en: { name: "Alex Chen", role: "Head Coach", description: "Former professional player..." },
            fr: { name: "Alex Chen", role: "Entraîneur Principal", description: "Ancien joueur professionnel..." },
            ar: { name: "أليكس تشين", role: "المدرب الرئيسي", description: "لاعب محترف سابق..." }
          }
        }
        // add more mock staff if needed
      ]
    }
  }
}
