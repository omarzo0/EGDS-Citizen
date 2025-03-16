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
} from "@mui/material";
function AccountSettings() {
  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="First Name" fullWidth defaultValue="omar" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Last Name" fullWidth defaultValue="Abdelhamid" />
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
          <TextField label="Postal Code" fullWidth defaultValue="101012" />
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
        <Grid item xs={12} md={6}>
          <TextField label="Current Password" fullWidth defaultValue="121223" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="New Password" fullWidth defaultValue="121223" />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Update
      </Button>
    </CardContent>
  );
}

export default AccountSettings;
