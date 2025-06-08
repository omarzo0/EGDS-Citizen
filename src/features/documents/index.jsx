import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../lib/ui/button";
import { Input } from "../../lib/ui/input";
import ServiceCard from "./components/service-card";
import DepartmentCard from "./components/department-card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState({
    departments: true,
    services: true,
  });
  const [error, setError] = useState({
    departments: null,
    services: null,
  });

  useEffect(() => {
    // Fetch departments
    fetch("http://localhost:5000/api/citizen/department-list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        return response.json();
      })
      .then((data) => {
        const transformedDepartments = data?.map((dept) => ({
          departmentId: dept.id || dept.departmentId,
          title: dept.name || dept.title,
          description: dept.description,
          icon: dept.icon || "FileText",
          color: `bg-${dept.color || "blue"}-50`,
          iconColor: `text-${dept.color || "blue"}-500`,
        }));
        setDepartments(transformedDepartments);
        setLoading((prev) => ({ ...prev, departments: false }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, departments: err.message }));
        setLoading((prev) => ({ ...prev, departments: false }));
      });

    // Fetch services
    fetch("http://localhost:5000/api/citizen/services-list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.services || !Array.isArray(data.services)) {
          throw new Error("Invalid services data format");
        }

        const transformedServices = data.services.map((service) => ({
          _id: service._id,
          name: service.name,
          Description: service.Description,
          icon: "FileText",
          href: `/services/${service._id}`,
          department: service.department_id?.name || "Government Department",
        }));

        setServices(transformedServices);
        setLoading((prev) => ({ ...prev, services: false }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, services: err.message }));
        setLoading((prev) => ({ ...prev, services: false }));
      });
  }, []);
  const handleViewServices = (departmentId) => {
    navigate(`/departments/${departmentId}/services`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            {t("Book Your Government Document Appointments")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            {t("Search for available services and schedule appointments for all your government document needs in one place.")}
          </p>
          <div className="mx-auto flex max-w-md items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder= {t("Search for services or documents...")}
                className="pl-10"
              />
            </div>
            <Button>{t("Search")}</Button>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">
            {t("Government Departments")}
          </h3>
          {loading.departments ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          ) : error.departments ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">
              Error loading departments: {error.departments}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => (
                <DepartmentCard
                  key={department.departmentId}
                  departmentId={department.departmentId}
                  title={department.title}
                  description={department.description}
                  icon={department.icon}
                  href={department.href}
                  color={department.color}
                  iconColor={department.iconColor}
                  onViewServices={() =>
                    handleViewServices(department.departmentId)
                  }
                />
              ))}
            </div>
          )}
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">{t("Popular Services")}</h3>
          {loading.services ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)]?.map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          ) : error.services ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">
              Error loading services: {error.services}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services?.map((service) => (
                <ServiceCard
                  key={service._id}
                  name={service.name}
                  description={service.Description}
                  icon={service.icon}
                  href={`/services/${service._id}`}
                  department={service.department_id?.name}
                  serviceId={service._id}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mb-16">
          <h3 className="mb-6 text-2xl font-semibold">How It Works</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">{t("Select a Service")}</h4>
              <p className="text-gray-600">
                {t("Choose from our comprehensive list of government document services.")}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">
                {t("Book an Appointment")}
              </h4>
              <p className="text-gray-600">
                {t("Select a convenient date and time from the available slots.")}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="mb-2 text-xl font-semibold">{t("Visit the Office")}</h4>
              <p className="text-gray-600">
                {t("Arrive at the scheduled time with required documents to complete your process.")}
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
                {t("Government Services Portal")}
              </h4>
              <p className="text-gray-300">
                {t("Making government services accessible to everyone.")}
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Quick Links")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/" className="hover:text-white">
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    {t("All Services")}
                  </Link>
                </li>
                <li>
                  <Link to="/departments" className="hover:text-white">
                    {t("Departments")}
                  </Link>
                </li>
                <li>
                  <Link to="/locations" className="hover:text-white">
                    {t("Locations")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white">
                    {t("FAQ")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Contact")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{t("Email: support@govservices.gov")}</li>
                <li>{t("Phone: 19990")}</li>
                <li>{t("Hours: Sun-Fri, 7am-5pm")}</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Subscribe")}</h4>
              <p className="mb-2 text-gray-300">
                {t("Get updates on new services and features")}
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder={t("Your email")}
                  className="rounded-r-none bg-gray-700 text-white"
                />
                <Button className="rounded-l-none">{t("Subscribe")}</Button>
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
