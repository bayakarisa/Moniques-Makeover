"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">We'd love to hear from you. Get in touch with us!</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <RadioGroup value={formData.subject} onValueChange={handleSubjectChange}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General Inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="order" id="order" />
                          <Label htmlFor="order">Order Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="appointment" id="appointment" />
                          <Label htmlFor="appointment">Appointment</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">Roysambu, Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">
                        <a href="tel:0741026232" className="hover:text-purple-600">
                          0741026232
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">
                        <a href="mailto:josephbaya9648@gmail.com" className="hover:text-purple-600">
                          josephbaya9648@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Monday - Saturday: 9am - 6pm</p>
                      <p className="text-gray-600">Sunday: 10am - 4pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600 p-6 rounded-lg shadow-sm text-white">
                <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
                <p className="mb-4">Ready to experience our beauty services? Book an appointment today!</p>
                <Button asChild variant="secondary" className="w-full">
                  <a href="/book-now">Book Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

