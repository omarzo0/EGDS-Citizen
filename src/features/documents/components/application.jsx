import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { useDispatch } from "react-redux";

export default function BookingPage() {
  const dispatch = useDispatch();

  const [serviceInfo, setServiceInfo] = useState({
    title: "",
    description: "",
    department: "",
    department_id: "",
    requirements: [],
    processing_time: "",
    fees: "",
    eligibility: "",
    loading: true,
    error: null,
  });

  const [formData, setFormData] = useState({
    preferred_contact_method: "Phone",
    location: "main",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const serviceid = queryParams.get("serviceId");

  useEffect(() => {
    if (!serviceid) return;

    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/citizen/services-list/${serviceid}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch service details");
        }

        setServiceInfo({
          title: data.service.name,
          description: data.service.Description,
          department:
            data.service.department_id?.name || "Government Department",
          department_id: data.service.department_id?._id || "",
          requirements: data.service.requirements || [
            "Proof of identity",
            "Completed application form",
            "Payment of applicable fees",
          ],
          processing_time: data.service.processing_time || "4 to 6 days",
          fees: data.service.fees
            ? `$${data.service.fees.toFixed(2)}`
            : "Fee information",
          eligibility:
            data.service.eligibility || "Eligibility criteria for this service",
          loading: false,
          error: null,
        });
      } catch (error) {
        setServiceInfo((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchServiceDetails();
  }, [serviceid]);

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!serviceid) {
      dispatch(
        showNotification({
          message: "Please select a service",
          status: 0,
        })
      );
      return;
    }

    if (!citizenId) {
      dispatch(
        showNotification({
          message: "Please login to continue",
          status: 0,
        })
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/citizen/documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            citizen_id: citizenId,
            serviceid: serviceid,
            department_id: serviceInfo.department_id,
            preferred_contact_method: formData.preferred_contact_method, // Add preferred contact method here
            application_type: formData.application_type, // Add application type here
            status: "Pending",
            amount: serviceInfo.fees.replace(/\D/g, ""),
            location: formData.location,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create document");
      }

      dispatch(
        showNotification({
          message: "Document created successfully!",
          status: 1,
        })
      );
      navigate(`/app/payment?documentId=${data.data._id}`);
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message || "Error creating document",
          status: 0,
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
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
                <CardTitle>Application Details</CardTitle>
                <CardDescription>
                  Provide your contact preferences for this application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="preferred_contact_method"
                    className="block text-sm font-medium"
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferred_contact_method"
                    value={formData.preferred_contact_method}
                    onChange={(e) =>
                      handleSelectChange(
                        "preferred_contact_method",
                        e.target.value
                      )
                    }
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select contact method</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="application_type"
                    className="block text-sm font-medium"
                  >
                    Application Type
                  </label>
                  <select
                    id="application_type"
                    value={formData.application_type}
                    onChange={(e) =>
                      handleSelectChange("application_type", e.target.value)
                    }
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select application type</option>
                    <option value="New">New</option>
                    <option value="Renewal">Renewal</option>
                    <option value="Lost Replacement">Lost Replacement</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Book The application</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center">
                    <span>
                      We will notify you when the document is finished
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Book the document"}
                  </Button>
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
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    All Services
                  </Link>
                </li>
                <li>
                  <Link to="/departments" className="hover:text-white">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link to="/locations" className="hover:text-white">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white">
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
