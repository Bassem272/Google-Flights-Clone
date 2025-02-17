
import React, { useState } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import { useRouter } from "next/router";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import UsbIcon from "@mui/icons-material/Usb";
import LinearProgress from "@mui/material/LinearProgress";

const FlightDetails = ({ itinerary, onSelectFlight }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const currentRoute = router.asPath;

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const chooseFlight = (flight) => {
    const fl = JSON.parse(localStorage.getItem("searchParams"));
    const { tripType } = fl;

    if (tripType === "round-trip" && currentRoute === "/return") {
      localStorage.setItem("returnFlight", JSON.stringify(flight));
      router.push("/final");
    } else if (tripType === "round-trip" && currentRoute === "/") {
      localStorage.setItem("departureFlight", JSON.stringify(flight));
      router.push("/return");
    } else {
      router.push("/final");
    }
  };

  if (!itinerary || !itinerary.legs || itinerary.legs.length === 0) {
    return (
      <Box sx={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "0px", boxShadow: 3 }}>
        <Typography variant="body1" color="error">
          No flight data available.
        </Typography>
      </Box>
    );
  }

  const departureLeg = itinerary.legs[0];
  const arrivalLeg = itinerary.legs[1];

  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        marginBottom: 0,
        width: "100%",
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FlightTakeoffIcon sx={{ color: "#4285F4" }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: "14px", md: "16px" }, color: "#4285F4" }}>
              {departureLeg?.departure ? new Date(departureLeg.departure).toLocaleTimeString() : "N/A"} ·{" "}
              {departureLeg?.origin?.name || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: 1, md: 3 } }}>
            <AccessTimeIcon sx={{ color: "#FBBC05" }} />
            <Typography variant="body2" sx={{ color: "#5F6368" }}>
              Travel time:{" "}
              {departureLeg?.durationInMinutes
                ? `${Math.floor(departureLeg.durationInMinutes / 60)} hr ${departureLeg.durationInMinutes % 60} min`
                : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: 1, md: 3 } }}>
            <FlightLandIcon sx={{ color: "#34A853" }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: "14px", md: "16px" }, color: "#34A853" }}>
              {departureLeg?.arrival ? new Date(departureLeg.arrival).toLocaleTimeString() : "N/A"} ·{" "}
              {departureLeg?.destination?.name || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ ml: { xs: 1, md: 3 } }}>
            <Typography variant="body2" sx={{ color: "#5F6368" }}>
              {departureLeg?.carriers?.marketing?.[0]?.name || "N/A"} · {departureLeg?.segments?.[0]?.flightNumber || "N/A"} ·{" "}
              {departureLeg?.segments?.[0]?.operatingCarrier?.name || "N/A"}
            </Typography>
          </Box>
        </Grid>

        {arrivalLeg && (
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FlightTakeoffIcon sx={{ color: "#4285F4" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: "14px", md: "16px" }, color: "#4285F4" }}>
                {arrivalLeg?.departure ? new Date(arrivalLeg.departure).toLocaleTimeString() : "N/A"} ·{" "}
                {arrivalLeg?.origin?.name || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: 1, md: 3 } }}>
              <AccessTimeIcon sx={{ color: "#FBBC05" }} />
              <Typography variant="body2" sx={{ color: "#5F6368" }}>
                Travel time:{" "}
                {arrivalLeg?.durationInMinutes
                  ? `${Math.floor(arrivalLeg.durationInMinutes / 60)} hr ${arrivalLeg.durationInMinutes % 60} min`
                  : "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: 1, md: 3 } }}>
              <FlightLandIcon sx={{ color: "#34A853" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: "14px", md: "16px" }, color: "#34A853" }}>
                {arrivalLeg?.arrival ? new Date(arrivalLeg.arrival).toLocaleTimeString() : "N/A"} ·{" "}
                {arrivalLeg?.destination?.name || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ ml: { xs: 1, md: 3 } }}>
              <Typography variant="body2" sx={{ color: "#5F6368" }}>
                {arrivalLeg?.carriers?.marketing?.[0]?.name || "N/A"} · {arrivalLeg?.segments?.[0]?.flightNumber || "N/A"} ·{" "}
                {arrivalLeg?.segments?.[0]?.operatingCarrier?.name || "N/A"}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#EA4335" }}>
          Price: {itinerary?.price?.formatted || "N/A"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AirlineSeatReclineExtraIcon sx={{ color: "#34A853" }} />
          <Typography variant="body2" sx={{ color: "#5F6368" }}>Below average legroom (29 in)</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <UsbIcon sx={{ color: "#4285F4" }} />
          <Typography variant="body2" sx={{ color: "#5F6368" }}>In-seat USB outlet</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {(currentRoute === "/#" || currentRoute === "/") && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4285F4",
              "&:hover": { backgroundColor: "#357ABD" },
            }}
            onClick={() => chooseFlight(itinerary)}
          >
            Select as Departure
          </Button>
        )}

        {currentRoute === "/return" && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#34A853",
              "&:hover": { backgroundColor: "#2D8E4A" },
            }}
            onClick={() => chooseFlight(itinerary)}
          >
            Choose Return Flight
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FlightDetails;