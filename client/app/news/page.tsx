import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-section"

export const metadata: Metadata = {
  title: "Latest News & Updates",
  description:
    "Stay updated with the latest JSK Esports news, tournament results, player updates, and gaming industry insights.",
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <NewsSection />
      </div>
      <Footer />
    </main>
  )
}
