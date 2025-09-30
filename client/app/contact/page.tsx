"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, Zap, Trophy, Users, Target } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
            Contact <span className="text-white">JSK Esports</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with partnerships, inquiries, and opportunities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Email Us</h3>
                    <p className="text-sm text-gray-400">info@jsktunisia.com</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Send us an email and we'll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Call Us</h3>
                    <p className="text-sm text-gray-400">+216 XX XXX XXX</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Speak directly with our team during business hours
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Visit Us</h3>
                    <p className="text-sm text-gray-400">Kairouan, Tunisia</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Come visit our headquarters and training facility
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Business Hours</h3>
                    <p className="text-sm text-gray-400">Mon-Fri: 9AM-6PM GMT+1</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Weekend support available for urgent matters</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Full Name *</label>
                      <Input
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Subject *</label>
                      <Input
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-md focus:border-green-500 focus:outline-none"
                      >
                        <option>General Inquiry</option>
                        <option>Partnership</option>
                        <option>Player Recruitment</option>
                        <option>Sponsorship</option>
                        <option>Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Message * ({formData.message.length}/500)
                    </label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white focus:border-green-500 min-h-32"
                      maxLength={500}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-medium py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Times */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
            Quick Response Times
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "General Inquiries", time: "Within 24 hours" },
              { icon: Users, title: "Partnership Requests", time: "Within 48 hours" },
              { icon: Trophy, title: "Player Recruitment", time: "Within 72 hours" },
              { icon: Zap, title: "Urgent Support", time: "Within 4 hours" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-green-500/20 hover:border-green-500/50 transition-all duration-300 text-center"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-green-500/20 rounded-lg w-fit mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                Visit Our Headquarters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-green-500/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12975.5786377529!2d10.084650610888673!3d35.63237499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fdc5a509d567a1%3A0x8d2d5e8b6d5c3b2a!2sKairouan%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-4 flex items-center justify-center text-gray-400">
                <MapPin className="w-5 h-5 text-green-400 mr-2" />
                <p>JSK Esports Headquarters, Kairouan, Tunisia</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}