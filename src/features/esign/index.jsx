import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../lib/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../lib/ui/tabs";
import { Badge } from "../../lib/ui/badge";
import DocumentUploader from "./components/document-uploader";

function Sign() {
  const [activeTab1, setActiveTab1] = useState("documents");

  // Mock data for documents
  const documents = [
    {
      id: "doc-1",
      title: "Birth Certificate Application",
      dateSubmitted: "2023-10-15",
      status: "signed",
      department: "Civil Registry",
    },
    {
      id: "doc-2",
      title: "Property Tax Declaration",
      dateSubmitted: "2023-11-02",
      status: "pending",
      department: "Revenue Department",
    },
    {
      id: "doc-3",
      title: "Business Permit Renewal",
      dateSubmitted: "2023-11-10",
      status: "processing",
      department: "Business Licensing",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-green-500">Signed</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Pending
          </Badge>
        );
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Citizen Dashboard
          </h2>
          <Button onClick={() => setActiveTab1("upload")}>
            Upload New Document
          </Button>
        </div>

        <Tabs
          value={activeTab1}
          onValueChange={setActiveTab1}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{doc.title}</h3>
                        <div className="mt-1 flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Submitted: {doc.dateSubmitted}
                          </span>
                          <span className="text-sm text-gray-500">
                            Department: {doc.department}
                          </span>
                          {getStatusBadge(doc.status)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {doc.status === "signed" && (
                          <Button size="sm">Download</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Document</CardTitle>
                <CardDescription>
                  Upload your document for processing and e-signature by
                  government officials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
export default Sign;
