"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Shield, Headphones, Gamepad2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { staffApi } from "@/lib/staffApi"

interface StaffMember {
  id: string
  name: string
  role: string
  avatar: string
  description: string
  level: number
  experience: string
  achievements: string[]
  translations: {
    en: { name: string; role: string; description: string }
    fr: { name: string; role: string; description: string }
    ar: { name: string; role: string; description: string }
  }
}

export function StaffSection() {
  const { t } = useLanguage()
  const { language } = useLanguage()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await staffApi.getStaff()
        console.log("Fetched staff:", data)
        setStaff(data)
      } catch (error) {
        console.error('Failed to fetch staff:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStaff()
  }, [])

  const getLocalizedContent = (member: StaffMember) => {
    if (member.translations && member.translations[language]) {
      return {
        name: member.translations[language].name || member.name,
        role: member.translations[language].role || member.role,
        description: member.translations[language].description || member.description,
      }
    }
    return {
      name: member.name,
      role: member.role,
      description: member.description,
    }
  }

  const getIconForLevel = (level: number) => {
    switch (level) {
      case 1: return Crown
      case 2: return Gamepad2
      case 3: return Headphones
      default: return Shield
    }
  }

  const getLevelTitle = (level: 1 | 2 | 3) => {
    const titles: Record<1 | 2 | 3, { en: string; fr: string; ar: string }> = {
      1: { en: "Management", fr: "Direction", ar: "الإدارة" },
      2: { en: "Game Managers ", fr: "Managers de Jeu ", ar: "مدراء الألعاب ن" },
      3: { en: "Specialized Managers", fr: "Managers Spécialisés", ar: "المدراء المتخصصون" },
    }
    return titles[level]?.[language] || `Level ${level}`
  }

  const groupedStaff = staff.reduce((acc, member) => {
    if (!acc[member.level]) acc[member.level] = []
    acc[member.level].push(member)
    return acc
  }, {} as Record<number, StaffMember[]>)

  if (loading) {
    return (
      <section id="staff" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-foreground mt-4">Loading staff...</p>
          </div>
        </div>
      </section>
    )
  }

  const sortedLevels = Object.keys(groupedStaff).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <section id="staff" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="/futuristic-gaming-setup-with-neon-lights-and-multi.png"
          alt="Gaming Setup Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans mb-4 animate-neon-flicker">
            {t("staff.title")} <span className="text-primary">{t("staff.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">{t("staff.subtitle")}</p>
        </div>

        <div className="space-y-12">
          {sortedLevels.map((level, levelIndex) => {
            const levelNum = parseInt(level)
            const members = groupedStaff[levelNum] || [] 
             if (members.length === 0) return null 
            return (
              <div key={levelNum} className="relative">
                {levelIndex > 0 && (
                  <div className="absolute inset-x-0 -top-6 flex justify-center">
                    <div className="h-6 w-0.5 bg-primary/30"></div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <Badge
                    variant="outline"
                    className="text-lg px-4 py-2 font-serif bg-primary/10 border-primary/30 text-primary"
                  >
                    Level {levelNum}: {getLevelTitle(levelNum as 1 | 2 | 3)}
                  </Badge>
                </div>

                <div
                  className={`grid gap-6 ${
                    members.length === 1
                      ? "max-w-md mx-auto"
                      : members.length === 2
                        ? "md:grid-cols-2 max-w-4xl mx-auto"
                        : "md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {members.map((member, memberIndex) => {
                    const IconComponent = getIconForLevel(levelNum)
                    const localizedContent = getLocalizedContent(member)
                    return (
                      <div key={member.id} className="relative">
                        {levelIndex > 0 && (
                          <div className="absolute inset-x-0 -top-6 flex justify-center">
                            <div className="h-6 w-0.5 bg-primary/30"></div>
                          </div>
                        )}
                        <Card
                          className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 animate-card-hover overflow-hidden"
                          style={{ animationDelay: `${levelIndex * 0.2 + memberIndex * 0.1}s` }}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="relative mb-4">
                              <Avatar className="w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300 ring-2 ring-primary/20 group-hover:ring-primary/50">
                                {member.avatar ? (
                                  // Fix: Use the full URL from the backend
                                  <AvatarImage src={`http://localhost:9000/uploads/${member.avatar}`} alt={member.name} />
                                ) : (
                                  <AvatarFallback className="bg-primary/20 text-primary">
                                    {member.name.split(" ")[0][0]}
                                    {member.name.split(" ")[1]?.[0] || ""}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50 group-hover:shadow-primary/80 transition-all duration-300">
                                <IconComponent className="w-4 h-4 text-primary-foreground" />
                              </div>
                            </div>
                            <h3 className="font-bold font-sans text-lg mb-1 group-hover:text-primary transition-colors animate-neon-flicker">
                              {localizedContent.name}
                            </h3>
                            <p className="text-primary font-serif font-medium mb-3">{localizedContent.role}</p>
                            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                              {localizedContent.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}