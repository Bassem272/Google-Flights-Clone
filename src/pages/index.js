import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";
import { fetchFlights } from "../utils/FlightService";
import Filters from "../components/Filters";
import { filterFlights } from "../utils/FilterFlights";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    airlines: [],
    stops: null,
    departureTime: null,
    maxDuration: Infinity,
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setFlights([]);
    setLoadingProgress(10);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const flightData = await fetchFlights(searchParams);
      setFlights(flightData);
      setLoadingProgress(100);
      setTimeout(() => setIsLoading(false), 500);
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
    } catch (error) {
      setIsLoading(false);
    }
  };

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
  const [showFilters, setShowFilters] = useState(false);
  const filteredFlights = filterFlights(flights, filters);
  useEffect(() => {
    if (filteredFlights.length > 0) {
      setShowFilters(true);
    }
  }, [filteredFlights]);

  return (
    <div>
      <Header />
      <SearchForm onSearch={handleSearch} />

      {isLoading && (
        <Box sx={{ width: "100%", marginY: 2 }}>
          <LinearProgress variant="determinate" value={loadingProgress} />
        </Box>
      )}
      {showFilters && (
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      )}

      <Results flights={filteredFlights} hasSearched={hasSearched} />
    </div>
  );
};

export default Home;
