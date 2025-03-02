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
import { Reminders } from "./components/reminders";
import Digitalwallet from "./components/digital-wallet";
import Bills from "./components/bills";
import AccountSettings from "./components/AccountSettings";
import { Link } from "react-router-dom";
function ProfilePage({ document, onClick, isSelected }) {
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
                    borderColor: "black",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  View e-sign Progress
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
                  color: "black",
                },
                ".MuiTabs-indicator": {
                  backgroundColor: "black",
                },
              }}
            >
              <Tab label="Account Settings" />
              <Tab label="Digital Wallet" />
              <Tab label="Reminders" />
              <Tab label="Bills" />
            </CustomTabs>
            {/* Account Settings Tab */}

            {tabValue === 0 && <AccountSettings />}

            {/* Digital Wallet Tab */}

            {tabValue === 1 && <Digitalwallet />}
            {/* Reminder Tab */}

            {tabValue === 2 && (
              <CardContent>
                <Card>
                  <Reminders />
                </Card>
              </CardContent>
            )}
            {/* Bills Tab */}
            {tabValue === 3 && <Bills />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ProfilePage;
