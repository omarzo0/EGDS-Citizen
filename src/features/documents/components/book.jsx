import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../lib/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../lib/ui/tabs";
import { Badge } from "../../../lib/ui/badge";
import { useState, useEffect } from "react";

export default function ServicePage() {
  const [serviceInfo, setServiceInfo] = useState({
    title: "",
    description: "",
    department: "",
    requirements: [],
    processing_time: "",
    fees: "",
    eligibility: "",
    loading: true,
    error: null,
  });
  const [activeTab, setActiveTab] = useState("info");
  const { serviceId } = useParams();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/citizen/services-list/${serviceId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch service details");
        }

        setServiceInfo({
          title: data.service.name,
          description: data.service.Description,
          availableLocations: data.service.availableLocations,
          department:
            data.service.department_id?.name || "Government Department",
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
  }, [serviceId]);

  if (serviceInfo.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading service details...</div>
      </div>
    );
  }

  if (serviceInfo.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error: {serviceInfo.error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="mb-2 text-3xl font-bold">{serviceInfo.title}</h2>
            <Badge variant="outline">{serviceInfo.department}</Badge>
          </div>
          <p className="text-lg text-gray-600">{serviceInfo.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="info" className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">Service Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">
                      Processing Time
                    </h4>
                    <p>{serviceInfo.processing_time}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Fee</h4>
                    <p>{serviceInfo.fees}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="locations" className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Available Locations
                </h3>
                {serviceInfo?.availableLocations?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Available Locations:
                    </p>
                    {serviceInfo?.availableLocations?.map((location, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-600 pl-2 border-l border-gray-300"
                      >
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {location.name}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {location.address}
                        </p>
                        <p>
                          <span className="font-semibold">Hours:</span>{" "}
                          {location.operatingHours}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book The application</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <span>We will notify you when the document is ready</span>
                </div>
                <Link
                  to={`/app/application?serviceId=${serviceId}`}
                  className="w-full"
                >
                  <Button className="w-full">Fill the form</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
