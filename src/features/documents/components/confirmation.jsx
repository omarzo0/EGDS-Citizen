import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Download,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/ui/card";
import { Badge } from "../../../lib/ui/badge";

export default function ConfirmationPage({ params }) {
  const serviceId = params?.serviceId;

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
  };

  const serviceInfo = serviceMap[serviceId] || {
    title: "Service Booking",
    department: "Government Department",
    requirements: ["Required documentation for your appointment"],
  };

  const appointmentDetails = {
    confirmationNumber: "APT-" + Math.floor(100000 + Math.random() * 900000),
    date: "February 28, 2025",
    time: "10:30 AM",
    location: "Main Office",
    address: "123 Government St, Downtown, City 10001",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center bg-green-100 rounded-full">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold">Appointment Confirmed!</h2>
          <p className="text-lg text-gray-600">
            Your appointment for {serviceInfo.title} has been confirmed.
          </p>
          <Badge variant="outline">{serviceInfo.department}</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Confirmation #{appointmentDetails.confirmationNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-primary/5 rounded-lg">
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
                    <p className="text-sm text-gray-600">
                      {appointmentDetails.address}
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="font-medium mt-4">What to Bring</h4>
              <ul className="list-disc list-inside text-gray-700">
                {serviceInfo.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
                <li>Payment method for applicable fees</li>
                <li>Appointment confirmation (printed or digital)</li>
                <li>payment confirmation Receipt</li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Appointment
                Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-semibold">
                Government Services Portal
              </h4>
              <p className="text-gray-300">
                Making government services accessible to everyone.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    All Services
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="hover:text-white">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="hover:text-white">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: support@govservices.gov</li>
                <li>Phone: 19990</li>
                <li>Hours: Sun-Fri, 7am-5pm</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Subscribe</h4>
              <p className="mb-2 text-gray-300">
                Get updates on new services and features
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-700 text-white"
                />
                <button className="rounded-l-none">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>
              © {new Date().getFullYear()} Government Services Portal. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
