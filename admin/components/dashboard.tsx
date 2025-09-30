"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Users, Gamepad2, Trophy, Building, Info, Newspaper, Package, ShoppingCart, Percent } from "lucide-react"
import { GamesManager } from "./managers/games-manager"
import { TeamsWithPlayersManager } from "./managers/players-manager" 
import { StaffManager } from "./managers/staff-manager"
import { NewsManager } from "./managers/news-manager"
import { TournamentsManager } from "./managers/tournaments-manager"
import { SponsorsManager } from "./managers/sponsors-manager"
import { AboutManager } from "./managers/about-manager"
import { ProductsManager } from "./managers/products-manager"
import { OrdersManager } from "./managers/orders-manager"
import { DiscountsManager } from "./managers/discounts-manager"

export function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("games")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">JSK Esports Admin</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Staff
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Sponsors
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="discounts" className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Discounts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <GamesManager />
          </TabsContent>
          <TabsContent value="teams">
            <TeamsWithPlayersManager /> {/* ✅ NEW */}
          </TabsContent>
          <TabsContent value="staff">
            <StaffManager />
          </TabsContent>
          <TabsContent value="news">
            <NewsManager />
          </TabsContent>
          <TabsContent value="tournaments">
            <TournamentsManager />
          </TabsContent>
          <TabsContent value="sponsors">
            <SponsorsManager />
          </TabsContent>
          <TabsContent value="about">
            <AboutManager />
          </TabsContent>
          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>
          <TabsContent value="discounts">
            <DiscountsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
