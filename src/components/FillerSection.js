import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { FlightTakeoff, AttachMoney, Security } from "@mui/icons-material";

const FillerSection = () => {
  const features = [
    {
      icon: <FlightTakeoff sx={{ fontSize: 40, color: "#1a73e8" }} />,
      title: "Seamless Booking",
      description: "Find and compare flights from top travel sites with ease.",
    },
    {
      icon: <AttachMoney sx={{ fontSize: 40, color: "#34a853" }} />,
      title: "Best Price Guarantee",
      description: "Get the lowest fares with real-time price tracking.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#ea4335" }} />,
      title: "Trusted by Millions",
      description: "Book with confidence on a secure and verified platform.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        padding: "60px 5vw",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#202124" }}>
        Why Choose Us?
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "#5f6368", margin: "10px 0 30px" }}
      >
        Experience hassle-free flight booking with unmatched benefits.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {feature.icon}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginTop: "10px" }}
              >
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#5f6368" }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FillerSection;
