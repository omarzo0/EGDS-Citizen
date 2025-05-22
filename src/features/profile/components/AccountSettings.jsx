import React, { useState } from "react";
import { CardContent } from "@mui/material";
import moment from "moment";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Card,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function AccountSettings({ citizenData }) {
  const [formData, setFormData] = useState({
    phone_number: citizenData.phone_number || "",
    email: citizenData.email || "",
    address: citizenData.address || "",
    marital_status: citizenData.marital_status || "",
    Government: citizenData.Government || "",
    current_password: "",
    new_password: "",
  });
  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        phone_number: formData.phone_number,
        email: formData.email,
        address: formData.address,
        marital_status: formData.marital_status,
        // Only include these if they're empty in the original data
        ...(!citizenData.Government && { Government: formData.Government }),
        ...(!citizenData.date_of_birth && {
          date_of_birth: formData.date_of_birth,
        }),
        ...(formData.new_password && {
          password: formData.new_password,
          current_password: formData.current_password,
        }),
      };

      const response = await axios.post(
        `http://localhost:5000/api/citizen/update-account/${citizenId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: "Account updated successfully!",
        severity: "success",
      });

      // Update the form data with the response
      setFormData((prev) => ({
        ...prev,
        ...response.data.data,
        date_of_birth: response.data.data.date_of_birth
          ? moment(response.data.data.date_of_birth).format("YYYY-MM-DD")
          : "",
        current_password: "",
        new_password: "",
      }));
    } catch (error) {
      console.error("Error updating account:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          "Failed to update account. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Determine if fields can be edited (one-time fields)
  const canEditField = (fieldName) => {
    const oneTimeFields = [
      "first_name",
      "last_name",
      "date_of_birth",
      "Government",
    ];
    if (!oneTimeFields.includes(fieldName)) return true;
    return !citizenData[fieldName];
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              name="first_name"
              fullWidth
              value={formData.first_name}
              onChange={handleChange}
              disabled={!canEditField("first_name")}
              helperText={
                !canEditField("first_name") &&
                "This field cannot be changed after initial set"
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              name="last_name"
              fullWidth
              value={formData.last_name}
              onChange={handleChange}
              disabled={!canEditField("last_name")}
              helperText={
                !canEditField("last_name") &&
                "This field cannot be changed after initial set"
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="address"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Marital Status"
              name="marital_status"
              fullWidth
              value={formData.marital_status}
              onChange={handleChange}
            >
              {maritalStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              name="phone_number"
              fullWidth
              value={formData.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="National ID"
              name="national_id"
              fullWidth
              value={formData.national_id}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Government"
              name="Government"
              fullWidth
              value={formData.Government}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Birthday"
              name="date_of_birth"
              type="date"
              fullWidth
              value={formData.date_of_birth}
              onChange={handleChange}
              disabled={!canEditField("date_of_birth")}
              helperText={
                !canEditField("date_of_birth") &&
                "This field cannot be changed after initial set"
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Current Password (required for password changes)"
              name="current_password"
              type="password"
              fullWidth
              value={formData.current_password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="New Password"
              name="new_password"
              type="password"
              fullWidth
              value={formData.new_password}
              onChange={handleChange}
              helperText="Leave blank to keep current password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CardContent>
  );
}

export default AccountSettings;
