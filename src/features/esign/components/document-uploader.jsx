import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

export function DocumentUploader({ onSuccess }) {
  const [state, setState] = useState({
    file: null,
    uploading: false,
    error: null,
    description: "",
    departments: [],
    services: [],
    selectedDepartment: "",
    selectedService: "",
    loadingDepartments: true,
    loadingServices: false,
  });

  const citizenId =
    useSelector((state) => state.auth?.citizenId) ||
    localStorage.getItem("citizenId");
  const token =
    useSelector((state) => state.auth?.token) || localStorage.getItem("token");
  const [selectedService, setSelectedService] = useState(""); // local state

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/citizen/department-list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const departmentsData = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setState((prev) => ({
          ...prev,
          departments: departmentsData,
          loadingDepartments: false,
          error: null,
        }));
      } catch (error) {
        console.error("Error fetching departments:", error);
        setState((prev) => ({
          ...prev,
          error: error.response?.data?.message || "Failed to load departments",
          loadingDepartments: false,
        }));
      }
    };

    fetchDepartments();
  }, [token]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!state.selectedDepartment) return;

      setState((prev) => ({ ...prev, loadingServices: true, error: null }));

      try {
        const response = await axios.get(
          `http://localhost:5000/api/citizen/esignature-services/${state.selectedDepartment}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const servicesData = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setState((prev) => ({
          ...prev,
          services: servicesData,
          loadingServices: false,
          selectedService: "",
        }));
      } catch (error) {
        console.error("Error fetching services:", error);
        setState((prev) => ({
          ...prev,
          error: error.response?.data?.message || "Failed to load services",
          loadingServices: false,
        }));
      }
    };

    fetchServices();
  }, [state.selectedDepartment, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedDepartment") {
      setState((prev) => ({
        ...prev,
        selectedDepartment: value,
        selectedService: "",
      }));
    }

    if (name === "selectedService") {
      setState((prev) => ({
        ...prev,
        selectedService: value,
      }));
    }

    if (name === "description") {
      setState((prev) => ({
        ...prev,
        description: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setState((prev) => ({
          ...prev,
          error: "File size exceeds 10MB limit",
        }));
        return;
      }
      setState((prev) => ({ ...prev, file, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.file || !state.selectedService) {
      setState((prev) => ({
        ...prev,
        error: "Please fill all required fields",
      }));
      return;
    }

    setState((prev) => ({ ...prev, uploading: true, error: null }));

    try {
      const payload = {
        citizenId: citizenId,
        service_id: state.selectedService,
        description: state.description || "NAN",
        uploaded_document: state.file.name,
      };

      const formData = new FormData();
      formData.append("citizenId", citizenId);
      formData.append("service_id", state.selectedService);
      formData.append("description", state.description || "NAN");
      formData.append("uploaded_document", state.file);

      console.log("Payload:", payload);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "http://localhost:5000/api/citizen/esignature",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success...
    } catch (error) {
      console.error("Error:", error);
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.message || "Submission failed",
        uploading: false,
      }));
    }
  };
  console.log({
    citizenId,
    service_id: state.selectedService,
    file: state.file,
    description: state.description,
  });
  if (state.loadingDepartments) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        E-Signature Document Upload
      </Typography>

      {/* Department Selection */}
      <div className="flex flex-col mb-4">
        <label htmlFor="department" className="mb-1 font-semibold">
          Select Department *
        </label>
        <select
          id="department"
          name="selectedDepartment"
          value={state.selectedDepartment}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Choose a department --</option>
          {state.departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Service Selection */}
      {state.selectedDepartment && (
        <div className="flex flex-col mb-4">
          <label htmlFor="service" className="mb-1 font-semibold">
            Select Service *
          </label>
          <select
            id="service"
            name="selectedService"
            value={state.selectedService}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Choose a service --</option>
            {state.services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description (Optional)"
        name="description"
        value={state.description}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      {/* File Upload */}
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "grey.400",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          mb: 3,
        }}
      >
        {state.file ? (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography>{state.file.name}</Typography>
              <Typography variant="caption">
                {(state.file.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
            <Button
              onClick={() => setState((prev) => ({ ...prev, file: null }))}
            >
              Remove
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Upload Document *
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
            </Typography>
            <Button variant="outlined" component="label">
              Select File
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </Button>
          </>
        )}
      </Box>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={state.uploading}
      >
        {state.uploading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Submit for E-Signature"
        )}
      </Button>
    </Box>
  );
}
