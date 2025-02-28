import { ArrowLeft, Calendar, Check, Clock, Download, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConfirmationPageProps {
  params: {
    serviceId: string
  }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const serviceId = params.serviceId

  // This would come from a database in a real application
  const serviceMap = {
    "birth-certificate": {
      title: "Birth Certificate",
      department: "Civil Registry",
      requirements: ["Valid government-issued photo ID"],
    },
    "passport-new": {
      title: "New Passport Application",
      department: "Immigration & Passports",
      requirements: [
        "Proof of citizenship (birth certificate or citizenship certificate)",
        "Valid government-issued photo ID",
        "Passport-sized photograph (taken within the last 6 months)",
      ],
    },
    "drivers-license-new": {
      title: "New Driver's License",
      department: "Driver & Vehicle",
      requirements: [
        "Proof of identity (birth certificate, passport, etc.)",
        "Proof of residency (utility bill, bank statement, etc.)",
        "Social Security Number or equivalent",
      ],
    },
    "national-id": {
      title: "National ID Card",
      department: "National ID",
      requirements: [
        "Proof of identity (birth certificate, passport, etc.)",
        "Proof of address (utility bill, bank statement, etc.)",
        "Passport-sized photograph (taken within the last 6 months)",
      ],
    },
    "property-title": {
      title: "Property Title",
      department: "Property & Land",
      requirements: ["Proof of ownership (deed, bill of sale, etc.)", "Property survey", "Identification documents"],
    },
    "marriage-certificate": {
      title: "Marriage Certificate",
      department: "Civil Registry",
      requirements: ["Valid government-issued photo ID", "Information about the marriage (date, location, names)"],
    },
  }

  const serviceInfo = serviceMap[serviceId as keyof typeof serviceMap] || {
    title: "Service Booking",
    department: "Government Department",
    requirements: ["Required documentation for your appointment"],
  }

  // This would be dynamic in a real application
  const appointmentDetails = {
    confirmationNumber: "APT-" + Math.floor(100000 + Math.random() * 900000),
    date: "February 28, 2025",
    time: "10:30 AM",
    location: "Main Office",
    address: "123 Government St, Downtown, City 10001",
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
        <Link href="/" className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-3xl font-bold">Appointment Confirmed!</h2>
          <div className="flex items-center justify-center gap-3">
            <p className="text-lg text-gray-600">Your appointment for {serviceInfo.title} has been scheduled.</p>
            <Badge variant="outline">{serviceInfo.department}</Badge>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Confirmation #{appointmentDetails.confirmationNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-primary/5 p-4">
                <div className="mb-4 flex items-start">
                  <Calendar className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Date & Time</h4>
                    <p>
                      {appointmentDetails.date} at {appointmentDetails.time}
                    </p>
                  </div>
                </div>
                <div className="mb-4 flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>{appointmentDetails.location}</p>
                    <p className="text-sm text-gray-600">{appointmentDetails.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Arrival Time</h4>
                    <p>Please arrive 15 minutes before your appointment</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">What to Bring</h4>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                  {serviceInfo.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                  <li>Payment method for applicable fees</li>
                  <li>Appointment confirmation (printed or digital)</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Appointment Details
              </Button>
              <div className="text-center text-sm text-gray-500">
                <p>A confirmation email has been sent to your email address.</p>
                <p>You can also access your appointment details in your account.</p>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <h3 className="mb-4 text-xl font-semibold">Need to make changes?</h3>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button variant="outline" className="flex-1">
                Reschedule Appointment
              </Button>
              <Button variant="outline" className="flex-1">
                Cancel Appointment
              </Button>
            </div>
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

