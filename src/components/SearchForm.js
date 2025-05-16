import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
  Container,
  InputAdornment,
  Box,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PlaceIcon from "@mui/icons-material/Place";
import { format } from "date-fns";
import FlightOptions from "./FlightOptions";
import { fetchSkyID } from "../utils/ApiService";
import { fetchCities } from "../utils/ApiCity";
import { useRef } from "react";
import CustomAlert from "./CustomAlert";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromSkyID, setFromSkyID] = useState(null);
  const [toSkyID, setToSkyID] = useState(null);
  const [fromSkyEntity, setFromSkyEntity] = useState(null);
  const [toSkyEntity, setToSkyEntity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);

  const [tripType, setTripType] = useState("round-trip");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    infantsOnLap: 0,
  });
  const [flightClass, setFlightClass] = useState("economy");
  const [hasSearched, setHasSearched] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useMemo(() => {
    return {
      fromSkyID,
      toSkyID,
      fromSkyEntity,
      toSkyEntity,
      departureDate: departureDate ? format(departureDate, "yyyy-MM-dd") : null,
      returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : null,
      tripType,
      adults: passengers.adults,
      childrens: passengers.children,
      infants: passengers.infants + passengers.infantsOnLap,
      flightClass,
    };
  }, [
    fromSkyID,
    toSkyID,
    fromSkyEntity,
    toSkyEntity,
    departureDate,
    returnDate,
    tripType,
    passengers,
    flightClass,
  ]);

  const prevSearchParams = usePrevious(searchParams);

  const handleSearch = () => {
    
    if (!fromSkyID || !toSkyID) {
      console.error("Missing SkyID for one or both cities. Please try again.");
      setErrorMsg("❌ One or both cities are invalid. Please enter valid city names.");
      setErrorOpen(true);
      // setLoading(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);

    const delayDebounceFn = setTimeout(() => {
      onSearch(searchParams);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (from) fetchSkyID(from, setFromSkyID, setFromSkyEntity);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [from]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (to) fetchSkyID(to, setToSkyID, setToSkyEntity);
    }, 2500);

    return () => clearTimeout(delayDebounceFn);
  }, [to]);

  useEffect(() => {
    if (!hasSearched) return;
    if (JSON.stringify(prevSearchParams) === JSON.stringify(searchParams))
      return;

    const delayDebounceFn = setTimeout(() => {
      onSearch(searchParams);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, hasSearched, onSearch, prevSearchParams]);
  const [cityOptions, setCityOptions] = useState([]);

  const handleInputChange = async (event, newValue) => {
    if (newValue.length > 1) {
      const results = await fetchCities(newValue);
      setCityOptions(results);
    } else {
      setCityOptions([]);
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <FlightOptions
        tripType={tripType}
        setTripType={setTripType}
        passengers={passengers}
        setPassengers={setPassengers}
        flightClass={flightClass}
        setFlightClass={setFlightClass}
      />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        fullWidth
      >
        <Grid item xs={12} sm={tripType === "round-trip" ? 3 : 4}>
          <Autocomplete
            freeSolo
            options={cityOptions}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => setFrom(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoffIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={tripType === "round-trip" ? 3 : 4}>
          <Autocomplete
            freeSolo
            options={cityOptions}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => setTo(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={tripType === "round-trip" ? 3 : 4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              format="EEE, MMM d"
              renderInput={(params) => <TextField fullWidth {...params} />}
              shouldDisableDate={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </LocalizationProvider>
        </Grid>

        {tripType === "round-trip" && (
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Return Date"
                value={returnDate}
                onChange={(newValue) => setReturnDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
                format="EEE, MMM d"
                shouldDisableDate={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </LocalizationProvider>
          </Grid>
        )}

        <Grid item xs={12} style={{ textAlign: "center" }}>
          {loading ? (
            <CircularProgress color="primary" />
          ) : !hasSearched ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={!from || !to}
            >
              Search Flights
            </Button>
          ) : null}
        </Grid>
      </Grid>
         <CustomAlert
        open={errorOpen}
        handleClose={() => setErrorOpen(false)}
        message={errorMsg}
      />
    </Container>

    
  );
};

export default SearchForm;
