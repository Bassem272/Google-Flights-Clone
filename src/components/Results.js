import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Avatar,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FlightDetails from "./FlightDetails";
import { useRouter } from "next/router";

const Results = ({ flights, hasSearched }) => {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (flights && flights.length > 0) {
      setLoading(false);
    }
  }, [flights]);

  if (!hasSearched) return null;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#555" }}
        >
          ✈️ No flights found
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", color: "#777" }}>
          Try changing your search criteria or the filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", px: isMobile ? 2 : 0 }}>
      <Box sx={{ width: isMobile ? "100%" : "80%", margin: "0 auto" }}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {flights.map((flight, index) => {
            const price = flight.price.formatted;
            const outbound = flight.legs[0];
            const airline = outbound.carriers.marketing[0];
            const isExpanded = expandedIndex === index;

            return (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: isMobile ? "8px" : "16px",
                    mb: 0,
                    boxShadow: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleToggle(index)}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{ width: "100%", alignItems: "center" }}
                  >
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      sx={{
                        display: isMobile ? "none" : "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        src={airline.logoUrl}
                        alt={airline.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          border: "1px solid #ddd",
                          backgroundColor: "#fff",
                        }}
                      />
                    </Grid>

                    <Grid item xs={5} sm={3} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#5F6368",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        {new Date(outbound.departure).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                        –
                        {new Date(outbound.arrival).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: isMobile ? "10px" : "12px",
                          color: "slate",
                        }}
                      >
                        {airline.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={5} sm={3} sx={{ textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#5F6368",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        {Math.floor(outbound.durationInMinutes / 60)} hr{" "}
                        {outbound.durationInMinutes % 60} min
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "slate",
                          fontSize: isMobile ? "10px" : "12px",
                        }}
                      >
                        {outbound.origin.city} → {outbound.destination.city}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: isMobile ? "none" : "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "slategray",
                          fontSize: isMobile ? "10px" : "12px",
                        }}
                      >
                        {outbound.stopCount === 0
                          ? "Nonstop"
                          : `${outbound.stopCount} stop${
                              outbound.stopCount > 1 ? "s" : ""
                            }`}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          color: "#EA4335",
                          fontSize: isMobile ? "14px" : "16px",
                        }}
                      >
                        {price}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(index);
                        }}
                        sx={{ color: "#4285F4" }}
                      >
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>

                {isExpanded && (
                  <Box sx={{ width: "100%" }}>
                    <FlightDetails itinerary={flight} />
                  </Box>
                )}
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Results;
