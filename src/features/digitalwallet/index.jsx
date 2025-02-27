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
  CardMedia,
  Modal,
  Backdrop,
  Fade,
  Box as MuiBox,
  Fab, // Import Floating Action Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import plus icon
import { useTranslation } from "react-i18next";

export default function DigitalWalletPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      if (uploadedFile.size > 5000000) {
        // Limit file size to 5MB
        setError("File size should be less than 5MB");
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(uploadedFile);
      setError(null);

      // Generate preview for images
      if (uploadedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        setPreview(null);
      }
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
      setOpen(false); // Close modal on successful upload
    }, 2000);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className="relative py-20 mb-5">
        <div className="absolute inset-0 bg-[#09122C]"></div>
        <div className="container  relative">
          <div className="flex justify-center">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Digital Wallet
              </h1>
              <p className="text-white text-lg mb-6">
                Store and manage your important documents like ID, driver's
                license, and more, securely in one place for easy access
                anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Digital Wallet Document Upload
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Upload your National ID, Driver’s License, or any other ID.
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for File Upload */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <MuiBox
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Document
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Upload your National ID, Driver’s License, or any other ID.
            </Typography>

            <Grid container spacing={2}>
              {/* File Upload Input */}
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  onChange={handleFileChange}
                  inputProps={{ accept: ".jpg, .jpeg, .png, .pdf" }}
                />
              </Grid>

              {/* Preview of Uploaded File */}
              {preview && (
                <Grid item xs={12}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={preview}
                    alt="Preview"
                    sx={{ borderRadius: 2, objectFit: "cover" }}
                  />
                </Grid>
              )}

              {/* Error or Success Messages */}
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
            </Grid>

            {/* Upload Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Upload"
                )}
              </Button>
            </Box>
          </MuiBox>
        </Fade>
      </Modal>

      {/* Floating Action Button (Circular Plus Icon) */}
      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          backgroundColor: "#872341", // Set the background color to #872341
          color: "white", // Set the icon color to white for contrast
          "&:hover": {
            backgroundColor: "#872341", // Ensure the color stays the same on hover
          },
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
