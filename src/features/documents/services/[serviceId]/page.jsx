import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ServicePage({ params }) {
  const serviceId = params.serviceId;

  // This would come from a database in a real application
  const serviceMap = {
    passport: {
      title: "Passport Application",
      description: "Apply for a new passport or renew an existing one",
      department: "Immigration & Passports",
      requirements: [
        "Proof of citizenship (birth certificate or citizenship certificate)",
        "Valid government-issued photo ID",
        "Passport-sized photograph (taken within the last 6 months)",
        "Completed application form",
        "Payment of applicable fees",
      ],
      processingTime: "4-6 weeks (standard) or 2-3 weeks (expedited)",
      fee: "$145.00 (standard) or $195.00 (expedited)",
      eligibility:
        "Citizens who have never had a passport or whose previous passport was issued when they were under 16 years of age.",
    },
    "birth-certificate": {
      title: "Birth Certificate",
      description: "Request a copy of a birth certificate",
      department: "Civil Registry",
      requirements: [
        "Valid government-issued photo ID",
        "Completed application form",
        "Payment of applicable fees",
      ],
      processingTime: "3-5 business days",
      fee: "$25.00",
      eligibility:
        "You can request your own birth certificate, or that of your child if you are the parent. Legal guardians may also request birth certificates for minors under their care. Immediate family members may request a birth certificate in certain circumstances.",
    },
    "drivers-license": {
      title: "Driver's License",
      description: "Apply for or renew your driver's license",
      department: "Driver & Vehicle",
      requirements: [
        "Proof of identity (birth certificate, passport, etc.)",
        "Proof of residency (utility bill, bank statement, etc.)",
        "Social Security Number or equivalent",
        "Completed application form",
        "Pass vision test, written test, and driving test",
        "Payment of applicable fees",
      ],
      processingTime: "7-10 business days after passing all tests",
      fee: "$60.00 (valid for 5 years)",
      eligibility:
        "Residents who meet the minimum age requirement (usually 16 years) and can pass all required tests.",
    },
    "national-id": {
      title: "National ID Card",
      description: "Apply for a new national ID card or renew an existing one",
      department: "National ID",
      requirements: [
        "Proof of identity (birth certificate, passport, etc.)",
        "Proof of address (utility bill, bank statement, etc.)",
        "Passport-sized photograph (taken within the last 6 months)",
        "Completed application form",
        "Payment of applicable fees",
      ],
      processingTime: "10-15 business days",
      fee: "$25.00",
      eligibility: "All citizens and legal residents over the age of 18.",
    },
    "marriage-certificate": {
      title: "Marriage Certificate",
      description: "Request a copy of a marriage certificate",
      department: "Civil Registry",
      requirements: [
        "Valid government-issued photo ID",
        "Information about the marriage (date, location, names)",
        "Completed application form",
        "Payment of applicable fees",
      ],
      processingTime: "3-5 business days",
      fee: "$25.00",
      eligibility:
        "Either spouse named on the certificate, immediate family members in certain circumstances, or legal representatives with proper authorization.",
    },
    "property-title": {
      title: "Property Title",
      description: "Register property or request title documents",
      department: "Property & Land",
      requirements: [
        "Proof of ownership (deed, bill of sale, etc.)",
        "Property survey",
        "Identification documents",
        "Completed application form",
        "Payment of applicable fees",
      ],
      processingTime: "15-20 business days",
      fee: "$75.00 plus applicable recording fees",
      eligibility: "Property owners or their authorized representatives.",
    },
  };

  const serviceInfo = serviceMap[serviceId] || {
    title: "Service Information",
    description: "Details about this service.",
    department: "Government Department",
    requirements: ["Documentation required for this service"],
    processingTime: "Processing time varies",
    fee: "Fee information",
    eligibility: "Eligibility criteria for this service",
  };

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
          href="/services"
          className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to services
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="mb-2 text-3xl font-bold">{serviceInfo.title}</h2>
            <Badge variant="outline">{serviceInfo.department}</Badge>
          </div>
          <p className="text-lg text-gray-600">{serviceInfo.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">Service Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">
                      Processing Time
                    </h4>
                    <p>{serviceInfo.processingTime}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Fee</h4>
                    <p>{serviceInfo.fee}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">
                      Payment Methods
                    </h4>
                    <p>Credit/debit card, cash, or money order</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Eligibility</h4>
                    <p>{serviceInfo.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">
                      Additional Information
                    </h4>
                    <p>
                      Please arrive 15 minutes before your scheduled appointment
                      time. Bring all required documents to avoid delays.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="requirements"
                className="rounded-lg border p-6"
              >
                <h3 className="mb-4 text-xl font-semibold">
                  Required Documents
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  {serviceInfo.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <h4 className="mb-2 font-medium text-gray-700">
                    Important Notes
                  </h4>
                  <ul className="list-inside list-disc space-y-2 text-gray-600">
                    <li>All documents must be original or certified copies</li>
                    <li>
                      Foreign documents must be translated to English by a
                      certified translator
                    </li>
                    <li>Proof of address must be less than 3 months old</li>
                    <li>Photo ID must be current and not expired</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="locations" className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Available Locations
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold">Main Office</h4>
                    <div className="mt-2 flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                      <p>123 Government St, Downtown, City 10001</p>
                    </div>
                    <div className="mt-2 flex items-start">
                      <Clock className="mr-2 h-5 w-5 text-gray-500" />
                      <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold">Westside Branch</h4>
                    <div className="mt-2 flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                      <p>456 West Ave, Westside, City 10002</p>
                    </div>
                    <div className="mt-2 flex items-start">
                      <Clock className="mr-2 h-5 w-5 text-gray-500" />
                      <p>Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold">Eastside Branch</h4>
                    <div className="mt-2 flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                      <p>789 East Blvd, Eastside, City 10003</p>
                    </div>
                    <div className="mt-2 flex items-start">
                      <Clock className="mr-2 h-5 w-5 text-gray-500" />
                      <p>Mon-Fri: 8:30 AM - 5:30 PM</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>
                  Select a date and time that works for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Available dates shown in calendar</span>
                </div>
                <Link href={`/services/${serviceId}/book`}>
                  <Button className="w-full">Schedule Appointment</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Government Services Portal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
