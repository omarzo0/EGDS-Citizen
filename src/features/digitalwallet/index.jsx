import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

export default function DigitalWalletPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > 5000000) {
        // Limit file size to 5MB
        setError("File size should be less than 5MB");
        setFile(null);
        return;
      }
      setFile(uploadedFile);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    // Simulate file upload with a timeout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Digital Wallet Document Upload
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Upload your National ID, Driver’s License, or any other ID
          </Typography>

          <Grid container spacing={2}>
            {/* File upload section */}
            <Grid item xs={12}>
              <TextField
                label="Select File"
                type="file"
                fullWidth
                onChange={handleFileChange}
                inputProps={{ accept: ".jpg, .jpeg, .png, .pdf" }} // Allow images and PDF files
              />
            </Grid>

            {/* Error or success messages */}
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Typography color="primary">
                  File uploaded successfully!
                </Typography>
              </Grid>
            )}

            {/* Upload button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Upload"
                )}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
