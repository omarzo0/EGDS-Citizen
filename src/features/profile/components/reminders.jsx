import React, { useEffect, useState } from "react";
import { CalendarIcon, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader } from "../../../lib/ui/card";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export function Reminders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/citizen/digital-document-list/${citizenId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [citizenId]);

  const getStatusBadge = (doc) => {
    switch (doc.expiration_status) {
      case "Expired":
        return <Badge color="error">Expired</Badge>;
      case "Expires Soon":
        return <Badge color="warning">Expires Soon</Badge>;
      default:
        return <Badge color="success">Valid</Badge>;
    }
  };

  const getStatusIcon = (doc) => {
    switch (doc.expiration_status) {
      case "Expired":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "Expires Soon":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.document_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        doc.document_number?.includes(searchTerm);

      const matchesType =
        documentType === "all" || doc.document_type === documentType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.expiry_date);
      const dateB = new Date(b.expiry_date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  if (loading)
    return <div className="text-center py-10">Loading documents...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search documents..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="all">All Documents</option>
          <option value="Passport">Passport</option>
          <option value="National ID">National ID</option>
          <option value="Driver's License">Driver's License</option>
          {/* Add other document types as needed */}
        </select>
        <select
          className="px-4 py-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Soonest First</option>
          <option value="desc">Latest First</option>
        </select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No documents found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {filteredDocuments.map((doc) => (
            <Card
              key={doc._id}
              className={`border-l-4 ${
                doc.expiration_status === "Expired"
                  ? "border-red-500"
                  : doc.expiration_status === "Expires Soon"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-medium">{doc.document_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.document_type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc)}
                    {getStatusBadge(doc)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Document #:</span>
                    {doc.document_number}
                  </div>

                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Issued: {format(parseISO(doc.issue_date), "MMM d, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {doc.expiration_status === "Expired"
                        ? "Expired on: "
                        : "Expires: "}
                      {format(parseISO(doc.expiry_date), "MMM d, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {doc.days_text ||
                        (doc.expiration_status === "Expired"
                          ? `Expired ${Math.abs(doc.days_remaining)} days ago`
                          : `${doc.days_remaining} days remaining`)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Status:</span>
                    <Badge
                      color={
                        doc.status === "Issued"
                          ? "success"
                          : doc.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
