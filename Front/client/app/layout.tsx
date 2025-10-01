import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { CartProvider } from "@/lib/cart-context"
import { StoreProvider } from "@/lib/store-context"
import { CartSidebar } from "@/components/store/cart-sidebar"
import { AuthProvider } from "@/context/AuthContext"
import { StructuredData } from "@/components/seo/structured-data"
import { AccessibilitySkipLink } from "@/components/ui/accessibility-skip-link"
import { PerformanceMonitor } from "@/components/ui/performance-monitor"
import { UserFeedback } from "@/components/ui/user-feedback"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: {
    default: "JSK Esports - Elite Gaming Team | Professional Esports Organization",
    template: "%s | JSK Esports",
  },
  description:
    "JSK Esports is a professional gaming organization featuring elite players, tournaments, news, and merchandise. Join the ultimate esports experience with our championship teams.",
  keywords: [
    "esports",
    "gaming",
    "professional gaming",
    "tournaments",
    "JSK",
    "elite gaming",
    "competitive gaming",
    "esports team",
    "gaming merchandise",
    "esports organization",
    "professional gamers",
    "gaming tournaments",
    "competitive esports",
    "esports news",
    "gaming gear",
    "esports apparel",
  ],
  authors: [{ name: "JSK Esports" }],
  creator: "JSK Esports",
  publisher: "JSK Esports",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fr: "/fr",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "JSK Esports - Elite Gaming Team",
    description: "Professional esports organization featuring elite players, tournaments, and gaming excellence.",
    siteName: "JSK Esports",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JSK Esports - Elite Gaming Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSK Esports - Elite Gaming Team",
    description: "Professional esports organization featuring elite players, tournaments, and gaming excellence.",
    images: ["/og-image.jpg"],
    creator: "@JSKEsports",
    site: "@JSKEsports",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
  category: "Gaming",
  classification: "Esports Organization",
  generator: "JSK Esports",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#427e17" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <AccessibilitySkipLink />
        <LanguageProvider>
          <AuthProvider>
            <StoreProvider>
              <CartProvider>
                <div id="main-content">{children}</div>
                <CartSidebar />
                <UserFeedback />
                <PerformanceMonitor />
              </CartProvider>
            </StoreProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
