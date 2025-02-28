import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format, isBefore, addMonths, parseISO } from "date-fns";
import { Card, CardContent, CardHeader } from "../components/ui/card";

import { Badge } from "@mui/material";

// Mock data for reminders
const mockReminders = [
  {
    id: "1",
    documentType: "National ID",
    nationalId: "1234567890",
    ownerName: "Ahmed Mohamed",
    expirationDate: "2025-04-15",
    status: "warning", // expires in less than 3 months
  },
  {
    id: "2",
    documentType: "Passport",
    nationalId: "1234567890",
    ownerName: "Ahmed Mohamed",
    expirationDate: "2025-03-10",
    status: "warning",
  },
  {
    id: "3",
    documentType: "Driver's License",
    nationalId: "9876543210",
    ownerName: "Sara Ahmed",
    expirationDate: "2025-06-22",
    status: "normal",
  },
  {
    id: "4",
    documentType: "National ID",
    nationalId: "5678901234",
    ownerName: "Mahmoud Ali",
    expirationDate: "2025-03-05",
    status: "critical", // expires in less than 1 month
  },
  {
    id: "5",
    documentType: "Residence Permit",
    nationalId: "3456789012",
    ownerName: "Fatima Hassan",
    expirationDate: "2026-01-18",
    status: "normal",
  },
];

export function Reminders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter reminders based on search term and document type
  const filteredReminders = mockReminders.filter((reminder) => {
    const matchesSearch =
      reminder.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.nationalId.includes(searchTerm);

    const matchesType =
      documentType === "all" || reminder.documentType === documentType;

    return matchesSearch && matchesType;
  });

  // Sort reminders by expiration date
  const sortedReminders = [...filteredReminders].sort((a, b) => {
    const dateA = new Date(a.expirationDate);
    const dateB = new Date(b.expirationDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Calculate status based on expiration date
  const getStatus = (expirationDate) => {
    const today = new Date();
    const expDate = parseISO(expirationDate);
    const oneMonthFromNow = addMonths(today, 1);
    const threeMonthsFromNow = addMonths(today, 3);

    if (isBefore(expDate, today)) {
      return "expired";
    } else if (isBefore(expDate, oneMonthFromNow)) {
      return "critical";
    } else if (isBefore(expDate, threeMonthsFromNow)) {
      return "warning";
    } else {
      return "normal";
    }
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "critical":
        return <Badge variant="destructive">Expires Soon</Badge>;
      case "warning":
        return (
          <Badge
            variant="warning"
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Expiring Soon
          </Badge>
        );
      default:
        return <Badge variant="outline">Valid</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {sortedReminders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No reminders found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {sortedReminders.map((reminder) => {
            const currentStatus = getStatus(reminder.expirationDate);
            return (
              <Card
                key={reminder.id}
                className={`
                ${currentStatus === "expired" ? "border-black-500" : ""}
                ${currentStatus === "critical" ? "border-red-300" : ""}
                ${currentStatus === "warning" ? "border-yellow-300" : ""}
              `}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{reminder.documentType}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reminder.ownerName}
                      </p>
                    </div>
                    {getStatusBadge(currentStatus)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">National ID:</span>
                      {reminder.nationalId}
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Expires on:{" "}
                        {format(new Date(reminder.expirationDate), "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {(() => {
                          const today = new Date();
                          const expDate = parseISO(reminder.expirationDate);
                          const diffTime = Math.abs(
                            expDate.getTime() - today.getTime()
                          );
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );

                          if (expDate < today) {
                            return `Expired ${diffDays} days ago`;
                          } else {
                            return `${diffDays} days remaining`;
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
