import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../lib/ui/button";
import ServiceCard from "../components/service-card";

const departmentData = {
  "civil-registry": {
    title: "Civil Registry",
    services: [
      {
        id: "birth-certificate",
        title: "Birth Certificate",
        description: "Request a copy of a birth certificate",
        icon: "FileText",
      },
      {
        id: "marriage-certificate",
        title: "Marriage Certificate",
        description: "Request a copy of a marriage certificate",
        icon: "Heart",
      },
      {
        id: "death-certificate",
        title: "Death Certificate",
        description: "Request a copy of a death certificate",
        icon: "FileText",
      },
    ],
  },
  immigration: {
    title: "Immigration & Passports",
    services: [
      {
        id: "passport",
        title: "Passport Application",
        description: "Apply for a new passport or renew an existing one",
        icon: "Plane",
      },
      {
        id: "visa",
        title: "Visa Application",
        description: "Apply for a visa",
        icon: "FileText",
      },
    ],
  },
  "national-id": {
    title: "National ID",
    services: [
      {
        id: "national-id",
        title: "National ID Card",
        description: "Apply for a new national ID card or renew existing one",
        icon: "CreditCard",
      },
    ],
  },
  "driver-vehicle": {
    title: "Driver & Vehicle",
    services: [
      {
        id: "drivers-license",
        title: "Driver's License",
        description: "Apply for or renew your driver's license",
        icon: "Car",
      },
      {
        id: "vehicle-registration",
        title: "Vehicle Registration",
        description: "Register a vehicle or renew registration",
        icon: "Car",
      },
    ],
  },
  tax: {
    title: "Tax & Revenue",
    services: [
      {
        id: "tax-filing",
        title: "Tax Filing",
        description: "File your taxes or get tax-related assistance",
        icon: "FileText",
      },
      {
        id: "business-registration",
        title: "Business Registration",
        description: "Register a new business",
        icon: "Briefcase",
      },
    ],
  },
  property: {
    title: "Property & Land",
    services: [
      {
        id: "property-title",
        title: "Property Title",
        description: "Register property or request title documents",
        icon: "Home",
      },
      {
        id: "land-survey",
        title: "Land Survey",
        description: "Request a land survey",
        icon: "Map",
      },
    ],
  },
};

export default function DepartmentPage({ params }) {
  const { departmentId } = params;
  const department = departmentData[departmentId] || {
    title: "Department Not Found",
    services: [],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <h1 className="mb-8 text-3xl font-bold">{department.title} Services</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {department.services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={`/services/${service.id}`}
            department={department.title}
          />
        ))}
      </div>

      <div className="mt-8">
        <Link href="/services">
          <Button variant="outline">View All Services</Button>
        </Link>
      </div>
    </div>
  );
}
