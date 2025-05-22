import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../lib/ui/button";
import ServiceCard from "./service-card";

export default function DepartmentPage() {
  const { departmentId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/citizen/by-department/${departmentId}`
        );
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [departmentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            name={service.name}
            description={service.Description}
            href={`/services/${service._id}`}
            department={service.department_id?.name}
            serviceId={service._id}
          />
        ))}
      </div>
    </div>
  );
}
