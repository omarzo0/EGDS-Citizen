import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"

export default function ServicesPage() {
  const services = [
    {
      id: "passport",
      title: "Passport Application",
      description: "Apply for a new passport or renew an existing one",
      icon: "Plane",
      department: "Immigration & Passports",
    },
    {
      id: "birth-certificate",
      title: "Birth Certificate",
      description: "Request a copy of a birth certificate",
      icon: "FileText",
      department: "Civil Registry",
    },
    {
      id: "drivers-license",
      title: "Driver's License",
      description: "Apply for or renew your driver's license",
      icon: "Car",
      department: "Driver & Vehicle",
    },
    {
      id: "national-id",
      title: "National ID Card",
      description: "Apply for a new national ID card or renew existing one",
      icon: "CreditCard",
      department: "National ID",
    },
    {
      id: "marriage-certificate",
      title: "Marriage Certificate",
      description: "Request a copy of a marriage certificate",
      icon: "Heart",
      department: "Civil Registry",
    },
    {
      id: "property-title",
      title: "Property Title",
      description: "Register property or request title documents",
      icon: "Home",
      department: "Property & Land",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Government Services</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={`/services/${service.id}`}
            department={service.department}
          />
        ))}
      </div>
      <div className="mt-8">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

