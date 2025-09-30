import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreSection } from "@/components/store/store-section"

export const metadata: Metadata = {
  title: "Official Store - Gaming Merchandise",
  description:
    "Shop official JSK Esports merchandise, gaming gear, apparel, and exclusive team items. Support your favorite esports team.",
}

export default function StorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <StoreSection />
      </div>
      <Footer />
    </main>
  )
}
