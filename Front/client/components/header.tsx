"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, LogIn, UserPlus, LogOut } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { authApi } from "@/lib/authApi"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const { t } = useLanguage()
  const { getTotalItems, setIsOpen } = useCart()
  const router = useRouter()
  const pathname = usePathname()

useEffect(() => {
  setIsAuth(authApi.isAuthenticated())
}, [])

  const handleLogout = () => {
    authApi.logout()
    setIsAuth(false)
    router.push("/auth/login")
  }

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.news"), href: "/news" },
    { name: t("nav.teams"), href: "/teams" },
    { name: t("nav.players"), href: "/teams" }, 
    { name: t("nav.staff"), href: "/staff" }, 
    { name: "Store", href: "/store" },
    { name: "Tournaments", href: "/tournaments" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  // Example implementation for authService.isAuthenticated
  // (Put this in /lib/authApi.ts)
  // export function isAuthenticated(): boolean {
  //   if (typeof window === "undefined") return false
  //   return !!localStorage.getItem("token")
  // }

  function logout() {
    authApi.logout()
    setIsAuth(false)
    router.push("/auth/login")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-glow">
            <span className="text-primary-foreground font-bold text-xl font-sans">JSK</span>
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans text-foreground">JSK ESPORTS</h1>
            <p className="text-xs text-muted-foreground font-serif">Elite Gaming Team</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-foreground hover:text-primary transition-colors duration-200 font-serif relative ${
                pathname === item.href ? "text-primary font-semibold" : ""
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
          <LanguageSwitcher />

          {!isAuth ? (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/login")}
                className="flex items-center space-x-1"
              >
                <LogIn className="h-4 w-4" /> <span>Login</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/register")}
                className="flex items-center space-x-1"
              >
                <UserPlus className="h-4 w-4" /> <span>Register</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-1">
              <LogOut className="h-4 w-4" /> <span>Logout</span>
            </Button>
          )}

          <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} className="relative">
            <ShoppingCart className="h-4 w-4" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <nav className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-4 space-y-4 max-h-screen overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block text-foreground hover:text-primary font-serif py-2 px-3 rounded-md transition-colors ${
                pathname === item.href ? "text-primary bg-primary/10 font-semibold" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-border space-y-2">
            {!isAuth ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={() => {
                    router.push("/auth/login")
                    setIsMenuOpen(false)
                  }}
                >
                  <LogIn className="h-4 w-4" /> <span>Login</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={() => {
                    router.push("/auth/register")
                    setIsMenuOpen(false)
                  }}
                >
                  <UserPlus className="h-4 w-4" /> <span>Register</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
              >
                <LogOut className="h-4 w-4" /> <span>Logout</span>
              </Button>
            )}

            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2 relative"
              onClick={() => {
                setIsOpen(true)
                setIsMenuOpen(false)
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
