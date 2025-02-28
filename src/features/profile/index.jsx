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
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import moment from "moment";
import { Reminders } from "./components/reminders";
import { Link } from "react-router-dom";

import { FileText, CreditCard, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";
function ProfilePage({ document, onClick, isSelected }) {
  const BILLS = [
    {
      invoiceNo: "#4567",
      amount: "23,989",
      description: "National ID renewed",
      status: "Pending",
      generatedOn: moment(new Date())
        .add(-30 * 1, "days")
        .format("DD MMM YYYY"),
      paidOn: "-",
    },

    {
      invoiceNo: "#4523",
      amount: "34,989",
      description: "New Passport ",
      status: "Pending",
      generatedOn: moment(new Date())
        .add(-30 * 2, "days")
        .format("DD MMM YYYY"),
      paidOn: "-",
    },

    {
      invoiceNo: "#4453",
      amount: "39,989",
      description: "Birth certificate",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 3, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 2, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#4359",
      amount: "28,927",
      description: "Driver licenses",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 4, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 3, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3359",
      amount: "28,927",
      description: "vehicle registration",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 5, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 4, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3367",
      amount: "28,927",
      description: "Tax filling",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 6, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 5, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3359",
      amount: "28,927",
      description: "property Title",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 7, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 6, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#2359",
      amount: "28,927",
      description: "Marriage Certificate",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 8, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 7, "days")
        .format("DD MMM YYYY"),
    },
  ];
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const CustomTabs = styled(Tabs)({
    "& .MuiTab-root": {
      color: "#BE3144",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#BE3144",
    },
  });
  const [bills, setBills] = useState(BILLS);

  const getPaymentStatus = (status) => {
    if (status === "Paid")
      return <div className="badge badge-success">{status}</div>;
    if (status === "Pending")
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };
  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ position: "relative", mb: 3 }}>
        <Box
          sx={{
            backgroundImage: "url(/cover.jpg)",
            backgroundSize: "cover", // or "contain" depending on your preference
            backgroundPosition: "center",
            height: 180,
            borderRadius: 2,
            backgroundRepeat: "no-repeat", // Avoids tiling if the image is smaller than the container
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {/* Profile Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="User Avatar"
                src="https://via.placeholder.com/100"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6">Omar Khaled</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Citizen
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>Documents applied: 32</Typography>
                <Typography>Digital wallet Documents: 26</Typography>
                <Typography>E-signature Documents: 6</Typography>
              </Box>

              <Link to="/app/esign" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderColor: "#BE3144",
                    color: "#BE3144",
                    "&:hover": {
                      borderColor: "#9C2A3A",
                      backgroundColor: "#9C2A3A",
                      color: "#fff",
                    },
                  }}
                >
                  View Docs & e-signature Progress
                </Button>
              </Link>
            </Box>
          </Card>
        </Grid>

        {/* Account Settings Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CustomTabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              sx={{
                ".MuiTab-root": {
                  color: "#BE3144", // Sets the text color for the tabs
                },
                ".MuiTabs-indicator": {
                  backgroundColor: "#BE3144", // Sets the color for the indicator
                },
              }}
            >
              <Tab label="Account Settings" />
              <Tab label="Digital Wallet" />
              <Tab label="Reminders" />
              <Tab label="Bills" />
            </CustomTabs>
            {/* Account Settings Tab */}

            {tabValue === 0 && (
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      defaultValue="omar"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      defaultValue="Abdelhamid"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone Number"
                      fullWidth
                      defaultValue="+201002020455"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="National ID"
                      fullWidth
                      defaultValue="30312030400298"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Postal Code"
                      fullWidth
                      defaultValue="101012"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      defaultValue="omarkhaled202080@gmail.com"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="City" fullWidth defaultValue="Suez" />
                  </Grid>
                  {/* Add Birthday field */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Birthday"
                      type="date"
                      fullWidth
                      defaultValue="1990-01-01"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "#872341",
                    "&:hover": {
                      backgroundColor: "#701b32",
                    },
                  }}
                >
                  Update
                </Button>
              </CardContent>
            )}
            {/* Digital Wallet Tab */}

            {tabValue === 1 && (
              <CardContent>
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md overflow-hidden",
                    isSelected && "ring-2 ring-primary"
                  )}
                  onClick={onClick}
                >
                  <div className="relative h-40 bg-gray-100">
                    {document?.file ? (
                      <img
                        src={
                          URL.createObjectURL(document?.file) ||
                          "/placeholder.svg"
                        }
                        alt={document?.name}
                        fill
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {document?.type}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{document?.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <CreditCard className="h-3.5 w-3.5 mr-1" />
                      <span className="truncate">
                        {document?.documentNumber}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Expires: {document?.expiryDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            )}
            {/* Reminder Tab */}

            {tabValue === 2 && (
              <CardContent>
                <Card>
                  {" "}
                  <Reminders />
                </Card>
              </CardContent>
            )}
            {/* Bills Tab */}

            {tabValue === 3 && (
              <CardContent>
                <div className="overflow-x-auto w-full">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Invoice No</th>
                        <th>Invoice Generated On</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice Paid On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((l, k) => {
                        return (
                          <tr key={k}>
                            <td>{l.invoiceNo}</td>
                            <td>{l.generatedOn}</td>
                            <td>{l.description}</td>
                            <td>{l.amount} LE</td>
                            <td>{getPaymentStatus(l.status)}</td>
                            <td>{l.paidOn}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ProfilePage;
