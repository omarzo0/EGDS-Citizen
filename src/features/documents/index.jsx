import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../lib/ui/button";
import { Input } from "../../lib/ui/input";
import ServiceCard from "./components/service-card";
import DepartmentCard from "./components/department-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Book Your Government Document Appointments
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Search for available services and schedule appointments for all your
            government document needs in one place.
          </p>
          <div className="mx-auto flex max-w-md items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for services or documents..."
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">
            Government Departments
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DepartmentCard
              title="Civil Registry"
              description="Birth, marriage, and death certificates"
              icon="FileText"
              href="../departments/civil-registry"
              color="bg-blue-50"
              iconColor="text-blue-500"
            />
            <DepartmentCard
              title="Immigration & Passports"
              description="Passport applications, renewals, and visa services"
              icon="Plane"
              href="/departments/immigration"
              color="bg-green-50"
              iconColor="text-green-500"
            />
            <DepartmentCard
              title="National ID"
              description="National ID cards, renewals, and updates"
              icon="CreditCard"
              href="/departments/national-id"
              color="bg-purple-50"
              iconColor="text-purple-500"
            />
            <DepartmentCard
              title="Driver & Vehicle"
              description="Driver's licenses, vehicle registration, and permits"
              icon="Car"
              href="/departments/driver-vehicle"
              color="bg-orange-50"
              iconColor="text-orange-500"
            />
            <DepartmentCard
              title="Tax & Revenue"
              description="Tax filing, business registration, and tax ID"
              icon="Receipt"
              href="/departments/tax"
              color="bg-red-50"
              iconColor="text-red-500"
            />
            <DepartmentCard
              title="Property & Land"
              description="Property titles, deeds, and land registration"
              icon="Home"
              href="/departments/property"
              color="bg-teal-50"
              iconColor="text-teal-500"
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">Popular Services</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Passport Application"
              description="Apply for a new passport or renew an existing one"
              icon="Plane"
              href="/services/passport"
              department="Immigration & Passports"
            />
            <ServiceCard
              title="Birth Certificate"
              description="Request a copy of a birth certificate"
              icon="FileText"
              href="/services/birth-certificate"
              department="Civil Registry"
            />
            <ServiceCard
              title="Driver's License"
              description="Apply for or renew your driver's license"
              icon="Car"
              href="/services/drivers-license"
              department="Driver & Vehicle"
            />
            <ServiceCard
              title="National ID Card"
              description="Apply for a new national ID card or renew existing one"
              icon="CreditCard"
              href="/services/national-id"
              department="National ID"
            />
            <ServiceCard
              title="Marriage Certificate"
              description="Request a copy of a marriage certificate"
              icon="Heart"
              href="/services/marriage-certificate"
              department="Civil Registry"
            />
            <ServiceCard
              title="Property Title"
              description="Register property or request title documents"
              icon="Home"
              href="/services/property-title"
              department="Property & Land"
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">How It Works</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Select a Service</h4>
              <p className="text-gray-600">
                Choose from our comprehensive list of government document
                services.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">
                Book an Appointment
              </h4>
              <p className="text-gray-600">
                Select a convenient date and time from the available slots.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Visit the Office</h4>
              <p className="text-gray-600">
                Arrive at the scheduled time with required documents to complete
                your process.
              </p>
            </div>
          </div>
        </section>
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
                <li>Phone: 1-800-GOV-HELP</li>
                <li>Hours: Mon-Fri, 8am-5pm</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Subscribe</h4>
              <p className="mb-2 text-gray-300">
                Get updates on new services and features
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-700 text-white"
                />
                <Button className="rounded-l-none">Subscribe</Button>
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
