"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

// You can create a reusable StatCard component for a cleaner look
const StatCard = ({ value, label, icon, suffix }) => (
  <div
    className="relative group bg-black/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-[#427E17]/30 hover:border-[#427E17]/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#427E17]/20"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#427E17]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="text-3xl md:text-4xl font-bold text-[#427E17] mb-2">{value}</div>
      <div className="text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</div>
    </div>
    <div className="absolute inset-0 rounded-xl overflow-hidden">
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:animate-shine"></div>
    </div>
  </div>
)

export default function HeroSection() {
  const { t } = useLanguage()
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "/backgrounds/528793882_1362073868671010_6131996186837705482_n.jpg",
    "/backgrounds/533349802_1371777834367280_5368420078716293606_n.jpg",
    "/backgrounds/539101116_1379254380286292_7710243515578968124_n.jpg",
  ]

  const stats = [
    { id: 1, value: "25+", label: "Pro Players" },
    { id: 2, value: "8", label: "Competitive Teams" },
    { id: 3, value: "2018", label: "Established" },
    { id: 4, value: "50+", label: "Tournaments" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
              i === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <div
              className={`absolute inset-0 w-full h-full bg-cover bg-center transform ${
                i === currentImage ? "animate-kenburns" : ""
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      </div>

      {/* Grid Pattern and radial gradient for subtle movement */}
      <div className="absolute inset-0 z-10 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat animate-grid-move"></div>
      <div className="absolute inset-0 bg-radial-gradient z-10"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-20 text-center py-20">
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 -inset-4 bg-[#427E17] rounded-full filter blur-xl opacity-30 animate-pulse-slow"></div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jsk%20logo-nayy96unV7v3ZNkMVIGaOUTwefUg71.png"
              alt="JSK Esports Logo"
              className="relative w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl z-20 animate-float"
            />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl animate-text-glow">
            JSK ESPORTS
          </h1>
          <div className="w-64 h-1.5 mt-6 bg-gradient-to-r from-transparent via-[#427E17] to-transparent animate-expand"></div>
          <h2 className="mt-8 text-lg md:text-xl lg:text-2xl font-medium text-gray-200 uppercase tracking-widest animate-slide-in-bottom">
            KAIROUAN • TUNISIA
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
     
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
      
      {/* Global CSS for Animations */}
      <style jsx global>{`
        /* ... (Keep your existing keyframes here, they are already good) ... */
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.15) translate(20px, -15px); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes text-glow {
          0% { text-shadow: 0 0 10px rgba(66, 126, 23, 0.7), 0 0 20px rgba(66, 126, 23, 0.5); }
          100% { text-shadow: 0 0 20px rgba(66, 126, 23, 0.9), 0 0 40px rgba(66, 126, 23, 0.7); }
        }
        @keyframes expand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes slide-in-bottom {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .animate-kenburns { animation: kenburns 8s ease-in-out infinite alternate; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite alternate; }
        .animate-expand { animation: expand 2s ease-out forwards; }
        .animate-slide-in-bottom { animation: slide-in-bottom 1.2s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .animate-shine { animation: shine 1.5s ease-in-out; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .bg-radial-gradient {
          background: radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.8) 80%);
        }
      `}</style>
    </section>
  )
}