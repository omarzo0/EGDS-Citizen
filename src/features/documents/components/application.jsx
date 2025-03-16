import { ArrowLeft } from "lucide-react";
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
import { Input } from "../../../lib/ui/input";
import { Label } from "../../../lib/ui/label";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../lib/ui/select";
import { Badge } from "../../../lib/ui/badge";

export default function BookingPage({ params }) {
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
  };

  const serviceInfo = {
    title: "Service Booking",
    department: "Government Department",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <Link
          to={`/app/book`}
          className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to document details
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="mb-2 text-3xl font-bold">Book an Appointment</h2>
            <Badge variant="outline">{serviceInfo.department}</Badge>
          </div>
          <p className="text-lg text-gray-600">
            Schedule your appointment for {serviceInfo.title}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Please provide your details for the appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  <p className="text-sm text-gray-500">
                    We'll send your appointment confirmation to this email
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number (if applicable)</Label>
                  <Input
                    id="id-number"
                    placeholder="Enter your ID number if you have one"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <select className="border rounded px-3 py-2">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document-details">Document Details</Label>
                  <Input
                    id="document-details"
                    placeholder="Enter details (e.g., date of birth, names on certificate)"
                  />
                  <p className="text-sm text-gray-500"></p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Location</CardTitle>
                <CardDescription>
                  Choose your preferred office location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Office Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>

                    <SelectItem value="main">Main Office</SelectItem>
                    <SelectItem value="westside">Westside Branch</SelectItem>
                    <SelectItem value="eastside">Eastside Branch</SelectItem>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label></Label>
                </div>
              </CardContent>
            </Card>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Book The application</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center">
                    <span>
                      We will send your notify you when the document finished
                    </span>
                  </div>
                  <Link to={`/app/payment`} className="w-full">
                    <Button className="w-full">Book the document</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
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
