import {
  Box,
  Button,
  Grid,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Reminders } from "./components/reminders";
import Digitalwallet from "./components/digital-wallet";
import Bills from "./components/bills";
import AccountSettings from "./components/AccountSettings";
import Feedback from "./components/feedback";
import Documents from "./components/documents"; // Import your Documents component
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({
    document_applications: 0,
    digital_wallet_documents: 0,
    e_signatures: 0,
    total_applications: 0,
  });
  const { t } = useTranslation();
  const [citizenData, setCitizenData] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    phone_number: "",
    email: "",
    Government: "",
    date_of_birth: "",
  });

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

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch counts data
      const countsResponse = await fetch(
        `http://localhost:5000/api/citizen/counts/${citizenId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!countsResponse.ok) {
        throw new Error(`Error fetching counts: ${countsResponse.status}`);
      }

      const countsData = await countsResponse.json();
      if (countsData.success && countsData.data.counts) {
        setCounts(countsData.data.counts);
      }

      // Fetch citizen account data
      const accountResponse = await fetch(
        `http://localhost:5000/api/citizen/account/${citizenId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!accountResponse.ok) {
        throw new Error(`Error fetching account: ${accountResponse.status}`);
      }

      const accountData = await accountResponse.json();
      if (accountData.success && accountData.data) {
        setCitizenData({
          first_name: accountData.data.first_name,
          last_name: accountData.data.last_name,
          national_id: accountData.data.national_id,
          phone_number: accountData.data.phone_number,
          email: accountData.data.email,
          Government: accountData.data.Government,
          date_of_birth: accountData.data.date_of_birth,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [citizenId, token]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>{t("Loading profile data...")}</Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 4, color: "error.main" }}>{t("Error: ")}{error}</Box>;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ position: "relative", mb: 3 }}>
        <Box
          sx={{
            backgroundImage: "url(/cover.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 180,
            borderRadius: 2,
            backgroundRepeat: "no-repeat",
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
              <Typography variant="h6">
                {citizenData.first_name} {citizenData.last_name}
              </Typography>
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
                <Typography>
                  {t("Documents applied:")} {counts.document_applications}
                </Typography>
                <Typography>
                  {t("Digital wallet Documents:")} {counts.digital_wallet_documents}
                </Typography>
                <Typography>
                  {t("E-signature Documents:")} {counts.e_signatures}
                </Typography>
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
                  {t("View e-sign Progress")}
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
              <Tab label="Documents" /> {/* New Documents tab */}
              <Tab label="Reminders" />
              <Tab label="Bills" />
              <Tab label="Feedback" />
            </CustomTabs>
            {tabValue === 0 && <AccountSettings citizenData={citizenData} />}
            {tabValue === 1 && <Digitalwallet />}
            {tabValue === 2 && <Documents />} {/* New Documents content */}
            {tabValue === 3 && (
              <CardContent>
                <Card>
                  <Reminders />
                </Card>
              </CardContent>
            )}
            {tabValue === 4 && <Bills />}
            {tabValue === 5 && <Feedback />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;
