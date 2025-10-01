// client/lib/sponsorsApi.ts
import { apiService } from "./apiService"

export const sponsorsApi = {
  getSponsors: async () => {
    try {
      return await apiService.get("/api/sponsors")
    } catch (error) {
      console.warn("API not available, returning mock sponsors")
      return [
        {
          id: "1",
          name: "TechGear Pro",
          logo: "/tech-gaming-sponsor-logo.jpg",
          url: "https://techgear.com",
          description: "Premium gaming peripherals",
          order: 1,
          translations: {
            en: { name: "TechGear Pro", description: "Premium gaming peripherals" },
            fr: { name: "TechGear Pro", description: "Périphériques de jeu premium" },
            ar: { name: "تك جير برو", description: "أجهزة لعب ممتازة" },
          },
        },
        {
          id: "2",
          name: "Energy Boost",
          logo: "/energy-drink-sponsor-logo.jpg",
          url: "https://energyboost.com",
          description: "Official energy drink partner",
          order: 2,
          translations: {
            en: { name: "Energy Boost", description: "Official energy drink partner" },
            fr: { name: "Energy Boost", description: "Partenaire officiel de boisson énergétique" },
            ar: { name: "إنرجي بوست", description: "الشريك الرسمي لمشروبات الطاقة" },
          },
        },
      ]
    }
  },
}
