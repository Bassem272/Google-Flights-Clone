import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { fetchFlights } from "../utils/FlightService"; // Import the new service
import Results from "../components/Results";
import Filters from "../components/Filters";
import { filterFlights } from "../utils/FilterFlights";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const ReturnPage = () => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    airlines: [],
    stops: null,
    departureTime: null,
    maxDuration: Infinity,
  });

  useEffect(() => {
    const fetchFlightData = async () => {
      const searchParams = JSON.parse(localStorage.getItem("searchParams"));
      if (!searchParams) return;

      try {
        const flightData = await fetchFlights(searchParams, true);
        setFlights(flightData);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    const storedFlightDetails = localStorage.getItem("departureFlight");
    if (storedFlightDetails) {
      setFlightDetails(JSON.parse(storedFlightDetails));
      fetchFlightData();
    }
  }, []);

  const handleClearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 1000,
      airlines: [],
      stops: null,
      departureTime: null,
      maxDuration: Infinity,
    });
  };

  const filteredFlights = filterFlights(flights, filters);

  return (
    <Container style={{ textAlign: "start", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        {flightDetails?.legs[0]?.origin?.city} <SyncAltIcon />{" "}
        {flightDetails?.legs[0]?.destination?.city}
      </Typography>
      <Filters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />
      <Results flights={filteredFlights} hasSearched={true} />
    </Container>
  );
};

export default ReturnPage;
