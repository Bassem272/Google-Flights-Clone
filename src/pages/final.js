import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import Results from "../components/Results";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const FinalPage = () => {
  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [tripType, setTripType] = useState(null);
  const [isRoundTrip, setRoundTrip] = useState(false);

  useEffect(() => {
    const storedDepartureFlight = localStorage.getItem("departureFlight");
    const storedReturnFlight = localStorage.getItem("returnFlight");
    const storedSearchParams = localStorage.getItem("searchParams");

    const searchParams = storedSearchParams
      ? JSON.parse(storedSearchParams)
      : {};
    const { tripType } = searchParams;

    setTripType(tripType ?? null);
    setDepartureFlight(
      storedDepartureFlight ? JSON.parse(storedDepartureFlight) : null
    );
    setReturnFlight(storedReturnFlight ? JSON.parse(storedReturnFlight) : null);

    setRoundTrip(tripType === "round-trip");
  }, []);

  let flights = [];
  if (isRoundTrip) {
    flights = [departureFlight, returnFlight].filter(Boolean);
  } else {
    flights = [departureFlight].filter(Boolean);
  }

  const flightSegment = flights[0];

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Your Flight Booking is Confirmed! ✅
      </Typography>

      {tripType == "round-trip" ? (
        <Typography variant="h5" gutterBottom>
          {" "}
          Round Trip{" "}
        </Typography>
      ) : (
        <Typography variant="h5" gutterBottom>
          {" "}
          One Way Trip
        </Typography>
      )}

      <Typography variant="h4" gutterBottom>
        {flightSegment?.legs[0]?.origin?.city + " "}
        {isRoundTrip ? <SyncAltIcon /> : <TrendingFlatIcon />}
        {" " + flightSegment?.legs[0]?.destination?.city}
      </Typography>
      {flights.length > 0 && <Results flights={flights} hasSearched={true} />}
    </Container>
  );
};

export default FinalPage;
