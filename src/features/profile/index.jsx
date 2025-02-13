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
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import NotificationBodyRightDrawer from "../../features/common/components/NotificationBodyRightDrawer";

export default function ProfilePage() {
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
            </CustomTabs>

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
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
