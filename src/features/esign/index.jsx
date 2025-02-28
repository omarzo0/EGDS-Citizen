import { useState } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Tabs,
  Tab,
  Badge,
} from "@mui/material";
import { DocumentUploader } from "./components/document-uploader";

function Sign() {
  const [activeTab, setActiveTab] = useState(0);

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
        return <Badge badgeContent="Signed" color="success" />;
      case "pending":
        return <Badge badgeContent="Pending" color="warning" />;
      case "processing":
        return <Badge badgeContent="Processing" color="primary" />;
      default:
        return <Badge badgeContent="Unknown" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h4" component="h2" className="font-bold">
            E-signature panel system
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveTab(1)}
          >
            Upload New Document
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          className="w-full"
          indicatorColor="primary"
        >
          <Tab label="My Documents" />
          <Tab label="Upload Document" />
        </Tabs>

        {activeTab === 0 && (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} variant="outlined">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h6">{doc.title}</Typography>
                      <div className="mt-1 flex items-center gap-4">
                        <Typography variant="body2" color="textSecondary">
                          Submitted: {doc.dateSubmitted}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Department: {doc.department}
                        </Typography>
                        {getStatusBadge(doc.status)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outlined" size="small">
                        View
                      </Button>
                      {doc.status === "signed" && (
                        <Button variant="contained" size="small">
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <Card>
            <CardHeader title="Upload New Document" />
            <CardContent>
              <Typography variant="body2">
                Upload your document for processing and e-signature by
                government officials.
              </Typography>
              <DocumentUploader />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default Sign;
