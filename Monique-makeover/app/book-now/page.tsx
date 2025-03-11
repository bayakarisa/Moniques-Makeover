"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Service types
const services = [
  {
    id: "makeup",
    name: "Makeup Services",
    description: "Professional makeup application for any occasion",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=300&auto=format&fit=crop",
    options: [
      { id: "makeup-1", name: "Natural Everyday Makeup", price: 2500, duration: "45 min" },
      { id: "makeup-2", name: "Special Occasion Makeup", price: 3500, duration: "60 min" },
      { id: "makeup-3", name: "Bridal Makeup", price: 6000, duration: "90 min" },
      { id: "makeup-4", name: "Makeup Lesson", price: 4000, duration: "75 min" },
    ],
  },
  {
    id: "hair",
    name: "Hair Styling",
    description: "Expert hair styling and treatments",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=300&auto=format&fit=crop",
    options: [
      { id: "hair-1", name: "Blowout & Styling", price: 1800, duration: "45 min" },
      { id: "hair-2", name: "Haircut & Styling", price: 2500, duration: "60 min" },
      { id: "hair-3", name: "Hair Treatment", price: 3000, duration: "75 min" },
      { id: "hair-4", name: "Bridal Hair", price: 5000, duration: "90 min" },
    ],
  },
  {
    id: "skincare",
    name: "Skincare Treatments",
    description: "Rejuvenating facials and skin treatments",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=300&auto=format&fit=crop",
    options: [
      { id: "skin-1", name: "Express Facial", price: 2000, duration: "30 min" },
      { id: "skin-2", name: "Deep Cleansing Facial", price: 3500, duration: "60 min" },
      { id: "skin-3", name: "Anti-Aging Treatment", price: 4500, duration: "75 min" },
      { id: "skin-4", name: "Hydrating Facial", price: 3000, duration: "45 min" },
    ],
  },
]

// Available time slots
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

// Booking steps
type Step = "service" | "datetime" | "details" | "confirmation"

export default function BookNowPage() {
  const [step, setStep] = useState<Step>("service")
  const [selectedService, setSelectedService] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setSelectedOption("")
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === "service" && selectedService && selectedOption) {
      setStep("datetime")
    } else if (step === "datetime" && selectedDate && selectedTime) {
      setStep("details")
    } else if (step === "details" && formData.name && formData.email && formData.phone) {
      setStep("confirmation")
    } else {
      toast({
        title: "Please complete all required fields",
        description: "All fields are required to proceed.",
        variant: "destructive",
      })
    }
  }

  const handlePrevStep = () => {
    if (step === "datetime") {
      setStep("service")
    } else if (step === "details") {
      setStep("datetime")
    } else if (step === "confirmation") {
      setStep("details")
    }
  }

  const handleConfirmBooking = () => {
    // In a real app, you would send this data to your backend
    toast({
      title: "Booking Confirmed!",
      description: "Your appointment has been successfully booked.",
    })

    // Redirect to confirmation page
    setTimeout(() => {
      router.push("/book-now/confirmation")
    }, 2000)
  }

  const getSelectedServiceDetails = () => {
    const service = services.find((s) => s.id === selectedService)
    if (!service) return null

    const option = service.options.find((o) => o.id === selectedOption)
    if (!option) return null

    return { service, option }
  }

  const details = getSelectedServiceDetails()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Book Your Appointment</h1>
          <p className="text-gray-600 text-center mb-8">Experience beauty at its best with our professional services</p>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step === "service" || step === "datetime" || step === "details" || step === "confirmation" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <div
                className={`h-1 w-12 ${step === "datetime" || step === "details" || step === "confirmation" ? "bg-purple-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step === "datetime" || step === "details" || step === "confirmation" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <div
                className={`h-1 w-12 ${step === "details" || step === "confirmation" ? "bg-purple-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step === "details" || step === "confirmation" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <div className={`h-1 w-12 ${step === "confirmation" ? "bg-purple-600" : "bg-gray-200"}`}></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step === "confirmation" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                4
              </div>
            </div>
          </div>

          {/* Step 1: Select Service */}
          {step === "service" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Select a Service</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all ${selectedService === service.id ? "ring-2 ring-purple-600" : "hover:shadow-md"}`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {selectedService && (
                <>
                  <h3 className="text-lg font-medium mb-4">Select an Option</h3>
                  <RadioGroup value={selectedOption} onValueChange={handleOptionSelect} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services
                        .find((s) => s.id === selectedService)
                        ?.options.map((option) => (
                          <div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedOption === option.id ? "border-purple-600 bg-purple-50" : "hover:border-purple-200"}`}
                          >
                            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                            <Label htmlFor={option.id} className="flex justify-between items-center cursor-pointer">
                              <div>
                                <div className="font-medium">{option.name}</div>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <Clock className="h-4 w-4 mr-1" /> {option.duration}
                                </div>
                              </div>
                              <div className="text-lg font-semibold">Ksh {option.price.toLocaleString()}</div>
                            </Label>
                          </div>
                        ))}
                    </div>
                  </RadioGroup>
                </>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedService || !selectedOption}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === "datetime" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select a Date</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Simplified date selection for demo */}
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                      const date = new Date()
                      date.setDate(date.getDate() + day)
                      const dateStr = date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })

                      return (
                        <div
                          key={dateStr}
                          className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${selectedDate === dateStr ? "border-purple-600 bg-purple-50" : "hover:border-purple-200"}`}
                          onClick={() => handleDateSelect(dateStr)}
                        >
                          <div className="font-medium">{dateStr}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Select a Time</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${selectedTime === time ? "border-purple-600 bg-purple-50" : "hover:border-purple-200"}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <div className="font-medium">{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Details */}
          {step === "details" && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Your Details</h2>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or information we should know"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirmation" && details && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Confirm Your Booking</h2>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Please review your booking details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Service</h3>
                      <p className="font-medium">{details.service.name}</p>
                      <p>{details.option.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price</h3>
                      <p className="font-medium">Ksh {details.option.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Duration: {details.option.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                      <p className="font-medium">{selectedDate}</p>
                      <p>{selectedTime}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                      <p className="font-medium">{formData.name}</p>
                      <p className="text-sm">{formData.email}</p>
                      <p className="text-sm">{formData.phone}</p>
                    </div>
                  </div>

                  {formData.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Special Requests</h3>
                      <p className="text-sm">{formData.notes}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold">Ksh {details.option.price.toLocaleString()}</p>
                    </div>
                    <div className="text-sm text-gray-500">Pay at the salon</div>
                  </div>
                </CardFooter>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleConfirmBooking} className="bg-purple-600 hover:bg-purple-700">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

