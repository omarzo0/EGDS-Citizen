import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface BookingPageProps {
  params: {
    serviceId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const serviceId = params.serviceId

  // This would come from a database in a real application
  const serviceMap = {
    "birth-certificate": {
      title: "Birth Certificate",
      department: "Civil Registry",
    },
    "passport-new": {
      title: "New Passport Application",
      department: "Immigration & Passports",
    },
    "drivers-license-new": {
      title: "New Driver's License",
      department: "Driver & Vehicle",
    },
    "national-id": {
      title: "National ID Card",
      department: "National ID",
    },
    "property-title": {
      title: "Property Title",
      department: "Property & Land",
    },
    "marriage-certificate": {
      title: "Marriage Certificate",
      department: "Civil Registry",
    },
  }

  const serviceInfo = serviceMap[serviceId as keyof typeof serviceMap] || {
    title: "Service Booking",
    department: "Government Department",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <h1 className="text-xl font-bold">Government Services Portal</h1>
            </div>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link
          href={`/services/${serviceId}`}
          className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to service details
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="mb-2 text-3xl font-bold">Book an Appointment</h2>
            <Badge variant="outline">{serviceInfo.department}</Badge>
          </div>
          <p className="text-lg text-gray-600">Schedule your appointment for {serviceInfo.title}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide your details for the appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                  <p className="text-sm text-gray-500">We'll send your appointment confirmation to this email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number (if applicable)</Label>
                  <Input id="id-number" placeholder="Enter your ID number if you have one" />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="contact-email" />
                      <Label htmlFor="contact-email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="contact-sms" />
                      <Label htmlFor="contact-sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="contact-both" />
                      <Label htmlFor="contact-both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                {serviceId === "birth-certificate" || serviceId === "marriage-certificate" ? (
                  <div className="space-y-2">
                    <Label htmlFor="document-details">Document Details</Label>
                    <Input
                      id="document-details"
                      placeholder="Enter details (e.g., date of birth, names on certificate)"
                    />
                    <p className="text-sm text-gray-500">Provide specific details to help locate the document</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Location</CardTitle>
                <CardDescription>Choose your preferred date and office location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Office Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Office</SelectItem>
                      <SelectItem value="westside">Westside Branch</SelectItem>
                      <SelectItem value="eastside">Eastside Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Appointment Date</Label>
                  <Calendar mode="single" className="rounded-md border" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>Select a time for your appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    9:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    9:30 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    10:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    10:30 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    11:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    11:30 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    1:00 PM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    1:30 PM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    2:00 PM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    2:30 PM
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/services/${serviceId}/confirm`} className="w-full">
                  <Button className="w-full">Confirm Appointment</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Government Services Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

