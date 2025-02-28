import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

export function DocumentUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [department, setDepartment] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !department || !documentType) return;

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setFile(null);
        setDepartment("");
        setDocumentType("");
        setDescription("");
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      {uploadSuccess ? (
        <Alert severity="success" sx={{ textAlign: "center" }}>
          Document Uploaded Successfully
        </Alert>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <MenuItem value="civil-registry">Civil Registry</MenuItem>
              <MenuItem value="revenue">Revenue Department</MenuItem>
              <MenuItem value="business-licensing">Business Licensing</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="social-services">Social Services</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="document-type-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label"
              value={documentType}
              label="Document Type"
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <MenuItem value="birth-certificate">Birth Certificate</MenuItem>
              <MenuItem value="marriage-certificate">
                Marriage Certificate
              </MenuItem>
              <MenuItem value="property-tax">Property Tax Declaration</MenuItem>
              <MenuItem value="business-permit">Business Permit</MenuItem>
              <MenuItem value="drivers-license">Driver's License</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <Box
            sx={{
              border: "2px dashed grey",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
            }}
          >
            {file ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <span>{file.name}</span>
                  <span>{Math.round(file.size / 1024)} KB</span>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setFile(null)}
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ fontSize: "3rem", color: "grey" }}>📄</Box>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ marginTop: 2 }}
                >
                  Upload File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    hidden
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                <p>or drag and drop</p>
                <p>PDF, DOC, DOCX, JPG, JPEG, or PNG (max: 10MB)</p>
              </>
            )}
          </Box>

          {!file && (
            <Alert
              severity="warning"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Please upload a document file to continue.
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!file || !department || !documentType || uploading}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit Document"
            )}
          </Button>
        </>
      )}
    </Box>
  );
}
