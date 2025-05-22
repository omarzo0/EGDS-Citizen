import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import { CreditCard, Calendar } from "lucide-react";
import { useSelector } from "react-redux";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const DigitalWalletApp = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const authState = useSelector((state) => state.auth);

  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/citizen/documents-get/${citizenId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

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

  const DigitalWalletCard = ({ document, onClick, isSelected }) => {
    return (
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md overflow-hidden h-full",
          isSelected && "ring-2 ring-primary"
        )}
        onClick={onClick}
      >
        <CardContent className="h-full flex flex-col">
          <div className="relative h-40 bg-gray-100 flex justify-center items-center">
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {document?.status || "Document"}
            </div>
          </div>

          <div className="mt-2 flex-grow">
            <Typography variant="h6" className="font-medium truncate">
              {document?.service.name || "Document"}
            </Typography>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <CreditCard className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">
                {document?.document_number || "N/A"}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>
                Expires:{" "}
                {document?.last_update
                  ? new Date(document.last_update).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading && documents.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        {documents.length > 0 ? (
          documents.map((document) => (
            <Grid item xs={12} sm={6} key={document.id}>
              <DigitalWalletCard
                document={document}
                onClick={() => setSelectedDoc(document.id)}
                isSelected={selectedDoc === document.id}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center">No documents found</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DigitalWalletApp;
