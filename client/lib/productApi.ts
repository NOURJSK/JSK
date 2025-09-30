import { apiService } from "./apiService"

const mockProducts = [
  { id: 1, name: "JSK Team Jersey", price: 79.99, image: "/esports-team-jersey.jpg", category: "apparel", sizes: ["S","M","L","XL","XXL"] },
  { id: 2, name: "JSK Gaming Mouse Pad", price: 29.99, image: "/gaming-mouse-pad.jpg", category: "accessories" },
  { id: 3, name: "JSK Hoodie", price: 89.99, image: "/esports-team-hoodie.jpg", category: "apparel", sizes: ["S","M","L","XL","XXL"] },
  { id: 4, name: "JSK Water Bottle", price: 19.99, image: "/gaming-water-bottle.jpg", category: "accessories" },
]

export const productApi = {
  getAll: async () => {
    try {
      return await apiService.get("/api/products")
    } catch {
      console.warn("API not available, using mock products")
      return mockProducts
    }
  },
}
