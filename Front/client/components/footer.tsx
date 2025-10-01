"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Youtube, Twitch, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-sans">JSK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-sans">JSK ESPORTS</h3>
                <p className="text-xs text-muted-foreground font-serif">Elite Gaming Team</p>
              </div>
            </div>
            <p className="text-muted-foreground font-serif mb-6">
              Dominating the competitive gaming scene with skill, strategy, and teamwork.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitch className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-sans mb-4">Quick Links</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#teams" className="text-muted-foreground hover:text-primary transition-colors">
                  Teams
                </a>
              </li>
              <li>
                <a href="#players" className="text-muted-foreground hover:text-primary transition-colors">
                  Players
                </a>
              </li>
              <li>
                <a href="#news" className="text-muted-foreground hover:text-primary transition-colors">
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h4 className="font-semibold font-sans mb-4">Our Games</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <span className="text-muted-foreground">Valorant</span>
              </li>
              <li>
                <span className="text-muted-foreground">League of Legends</span>
              </li>
              <li>
                <span className="text-muted-foreground">CS2</span>
              </li>
              <li>
                <span className="text-muted-foreground">Rocket League</span>
              </li>
              <li>
                <span className="text-muted-foreground">Apex Legends</span>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold font-sans mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground font-serif">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                contact@jskesports.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground font-serif">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-muted-foreground font-serif">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Los Angeles, CA
              </div>

              <div className="mt-6">
                <h5 className="font-medium font-sans mb-2">Newsletter</h5>
                <div className="flex space-x-2">
                  <Input placeholder="Enter your email" className="font-serif" />
                  <Button className="font-serif">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-serif">
            © 2024 JSK Esports. All rights reserved. | Designed with passion for competitive gaming.
          </p>
        </div>
      </div>
    </footer>
  )
}
