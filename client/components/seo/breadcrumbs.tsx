"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { generateBreadcrumbStructuredData } from "@/lib/utils/seo-utils"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname, t)

  // Add home as first item if not present
  const allItems =
    breadcrumbItems[0]?.url !== "/" ? [{ name: t("nav.home"), url: "/" }, ...breadcrumbItems] : breadcrumbItems

  const structuredData = generateBreadcrumbStructuredData(allItems)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={structuredData} />
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
        {allItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />}
            {index === 0 && <Home className="w-4 h-4 mr-2 text-muted-foreground" />}
            {index === allItems.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="text-muted-foreground hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

function generateBreadcrumbsFromPath(pathname: string, t: (key: string) => string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  let currentPath = ""
  for (const segment of segments) {
    currentPath += `/${segment}`

    // Map path segments to readable names
    const nameMap: Record<string, string> = {
      about: t("nav.about"),
      news: t("nav.news"),
      store: t("nav.store"),
      teams: t("nav.teams"),
      tournaments: t("nav.tournaments"),
      contact: t("nav.contact"),
      auth: "Authentication",
      login: t("auth.login"),
      register: t("auth.register"),
    }

    const name = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ name, url: currentPath })
  }

  return breadcrumbs
}
