import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../lib/ui/button";
import ServiceCard from "./service-card";

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

export default function DepartmentPage() {
  const allServices = Object.values(departmentData).flatMap((department) =>
    department.services.map((service) => ({
      ...service,
      department: department.title,
    }))
  );

  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? allServices : allServices.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/app/documents"
        className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Documents
      </Link>

      <h1 className="mb-8 text-3xl font-bold">All Services</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service) => (
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
        {!showAll ? (
          <Button variant="outline" onClick={() => setShowAll(true)}>
            View All Services
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setShowAll(false)}>
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
}
