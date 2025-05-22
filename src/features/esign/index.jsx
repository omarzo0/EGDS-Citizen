import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Badge,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { DocumentUploader } from "./components/document-uploader";
function Sign() {
  const [activeTab, setActiveTab] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/citizen/esignature/${citizenId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Access the documents array from the response object
        if (data.success && Array.isArray(data.documents)) {
          setDocuments(data.documents);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch documents");
        setDocuments([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 0) {
      fetchDocuments();
    }
  }, [activeTab, citizenId]);

  const getStatusBadge = (status) => {
    switch (
      status.toLowerCase() // Make case-insensitive
    ) {
      case "signed":
        return <Badge badgeContent="Signed" color="success" />;
      case "pending":
        return <Badge badgeContent="Pending" color="warning" />;
      case "processing":
        return <Badge badgeContent="Processing" color="primary" />;
      default:
        return <Badge badgeContent={status} />;
    }
  };
  const handleCancel = async (docId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/citizen/esignature/${docId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to cancel document");
      }

      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
      setSuccessMessage("Document canceled successfully.");
    } catch (err) {
      console.error("Cancel error:", err);
      setError(err.message || "Failed to cancel the document.");
    }
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments([...documents, newDocument]);
    setSuccessMessage("Document uploaded successfully!");
    setActiveTab(0);
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
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
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={() => setActiveTab(1)}
          >
            Upload New Document
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          className="w-full"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "black" },
            "& .MuiTab-root": { color: "black" },
            "& .Mui-selected": { color: "black", fontWeight: "bold" },
          }}
        >
          <Tab label="My Documents" />
          <Tab label="Upload Document" />
        </Tabs>

        {activeTab === 0 && (
          <div className="grid gap-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : documents.length === 0 ? (
              <Typography>No documents found</Typography>
            ) : (
              documents.map((doc) => (
                <Card key={doc.id} variant="outlined">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography variant="h6">{doc.title}</Typography>
                        <div className="mt-1 flex items-center gap-4">
                          <Typography variant="body2" color="textSecondary">
                            Submitted:{" "}
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Department: {doc.department}
                          </Typography>
                          <div className="ml-7">
                            {getStatusBadge(doc.status)}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "black",
                            borderColor: "black",
                            "&:hover": { borderColor: "black" },
                          }}
                        >
                          View
                        </Button>

                        {doc.status.toLowerCase() === "signed" &&
                          doc.signed_document && (
                            <Button
                              variant="contained"
                              size="small"
                              component="a"
                              href={`http://localhost:5000/${
                                doc.signed_document
                                  .replace(/\\/g, "/")
                                  .split("src/")[1]
                              }`}
                              download
                              sx={{
                                backgroundColor: "black",
                                "&:hover": { backgroundColor: "#333" },
                              }}
                            >
                              Download
                            </Button>
                          )}

                        {doc.status.toLowerCase() === "pending" && (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => handleCancel(doc.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
              <DocumentUploader
                onSuccess={handleUploadSuccess}
                citizenId={citizenId}
              />
            </CardContent>
          </Card>
        )}

        <Snackbar
          open={!!error || !!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

export default Sign;
