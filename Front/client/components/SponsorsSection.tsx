"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRef } from 'react'
import { sponsorsApi } from "@/lib/sponsorApi"
import { useLanguage } from "@/lib/language-context"

interface Sponsor {
  id: string
  name: string
  logo: string
  url: string
  description: string
  order: number
  translations: {
    en: { name: string; description: string }
    fr: { name: string; description: string }
    ar: { name: string; description: string }
  }
}

export default function SponsorsSection() {
  const { language } = useLanguage()
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await sponsorsApi.getSponsors()
        setSponsors(data)
      } catch (error) {
        console.error('Failed to fetch sponsors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  const getLocalizedContent = (sponsor: Sponsor) => {
    if (sponsor.translations && sponsor.translations[language]) {
      return {
        name: sponsor.translations[language].name || sponsor.name,
        description: sponsor.translations[language].description || sponsor.description,
      }
    }
    return {
      name: sponsor.name,
      description: sponsor.description,
    }
  }

  if (loading) {
    return (
      <div className="relative w-full h-96 overflow-hidden flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
        <div className="relative w-full h-96 overflow-hidden flex items-center justify-center">
<div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
          filter: "blur(8px) brightness(0.4)"
        }}
      />
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-400"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section title */}
        <div className="text-center mb-12 lg:mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider">
              Our Sponsors
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-green-400"></div>
          </div>
          <p className="mt-6 text-green-200 max-w-2xl mx-auto">
            Proudly supported by industry leaders who share our passion for gaming excellence
          </p>
        </div>

        {/* Sponsors marquee */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
          
          {/* Scrolling track */}
          <div className="flex w-max animate-loop-scroll" ref={trackRef}>
            {sponsors.concat(sponsors).map((sponsor, index) => {
  const localizedContent = getLocalizedContent(sponsor)
  return (
    <a
      key={index}
      href={sponsor.url}
      className="sponsor-logo flex justify-center items-center mx-6 lg:mx-10 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
    >
      <div className="relative w-40 h-20 lg:w-48 lg:h-24 grayscale hover:grayscale-0 transition-all duration-500 bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-400 shadow-lg hover:shadow-green-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-lg"></div>
        <Image
          src={sponsor.logo || "/placeholder.svg"}
          alt={localizedContent.name}
          fill
          className="object-contain p-2"
        />
      </div>
    </a>
  )
})}

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loop-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-loop-scroll {
          animation: loop-scroll 40s linear infinite;
        }
        
        /* Pause animation on hover */
        .relative:hover .animate-loop-scroll {
          animation-play-state: paused;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-loop-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>

          </div>

  )
}