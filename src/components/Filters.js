import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  Popover,
  ListItemButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { airlinesList } from "../utils/AirLines";

const Filters = ({ filters, onFilterChange }) => {
  console.log("Filtersbbbbbbbbbbbb", filters);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [visibleFilterIndex, setVisibleFilterIndex] = useState(0);
  const [isFilterContentVisible, setIsFilterContentVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const filtersList = ["price", "stops", "departure"];

  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleAirlineChange = (airline) => {
    const airlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onFilterChange({ ...filters, airlines });
  };

  const handleStopsChange = (stopValue) => {
    console.log("Before update:", filters.stops);

    onFilterChange({ ...filters, stops: stopValue });

    setTimeout(() => {
      console.log("After update (delayed log):", filters.stops);
    }, 0);
  };

  const handleDepartureTimeChange = (timeRange) => {
    let timeKey = null;

    if (timeRange === "Morning (6 AM - 12 PM)") {
      timeKey = "morning";
    } else if (timeRange === "Afternoon (12 PM - 6 PM)") {
      timeKey = "afternoon";
    } else if (timeRange === "Evening (6 PM - 12 AM)") {
      timeKey = "evening";
    } else if (timeRange === "Night (12 AM - 6 AM)") {
      timeKey = "night";
    }

    console.log("Selected Departure Time Filter:", timeKey);
    onFilterChange({ ...filters, departureTime: timeKey });
  };

  // Carousel navigation
  const handleNextFilter = () => {
    setVisibleFilterIndex((prev) => (prev + 1) % filtersList.length);
    setIsFilterContentVisible(false);
  };

  const handlePrevFilter = () => {
    setVisibleFilterIndex((prev) =>
      prev === 0 ? filtersList.length - 1 : prev - 1
    );
    setIsFilterContentVisible(false);
  };

  const toggleFilterContent = () => {
    setIsFilterContentVisible((prev) => !prev);
  };

  const handlePopoverOpen = (event, filter) => {
    setAnchorEl((prev) => ({ ...prev, [filter]: event.currentTarget }));
  };

  const handlePopoverClose = (filter) => {
    setAnchorEl((prev) => ({ ...prev, [filter]: null }));
  };
  const departureOptions = [
    { label: "All", value: null },
    { label: "Morning (6 AM - 12 PM)", value: "morning" },
    { label: "Afternoon (12 PM - 6 PM)", value: "afternoon" },
    { label: "Evening (6 PM - 12 AM)", value: "evening" },
    { label: "Night (12 AM - 6 AM)", value: "night" },
  ];

  const isPopoverOpen = (filter) => Boolean(anchorEl[filter]);
  useEffect(() => {
    console.log(
      "filters)))))))))))))))))))))))))))))))))))))))))))))))))))))))))stops changed:",
      filters.stops
    );
  }, [filters.stops]);

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mt: 2 }}>
      {isSmallScreen ? (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handlePrevFilter}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={toggleFilterContent}
                endIcon={
                  isFilterContentVisible ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )
                }
              >
                {filtersList[visibleFilterIndex] === "price" && "Price Range"}
                {filtersList[visibleFilterIndex] === "stops" && "Stops"}
                {filtersList[visibleFilterIndex] === "airlines" && "Airlines"}
                {filtersList[visibleFilterIndex] === "departure" &&
                  "Departure Time"}
              </Button>
            </Box>
            <IconButton onClick={handleNextFilter}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {isFilterContentVisible && (
            <Box sx={{ mt: 2 }}>
              {filtersList[visibleFilterIndex] === "price" && (
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Price Range
                  </Typography>
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                  />
                  <Typography variant="body2">
                    ${filters.minPrice} - ${filters.maxPrice}
                  </Typography>
                </Box>
              )}

              {filtersList[visibleFilterIndex] === "stops" && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Stops
                  </Typography>
                  <List>
                    {["All", "Non-stop", "1 stop", "2 stops"].map((stop) => {
                      const stopValue =
                        stop === "All"
                          ? null
                          : stop === "Non-stop"
                          ? 0
                          : parseInt(stop) || null;

                      return (
                        <ListItem key={stop} disablePadding>
                          <ListItemButton
                            onClick={() => handleStopsChange(stopValue)}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters.stops === stopValue}
                                  onChange={() => handleStopsChange(stopValue)}
                                />
                              }
                              label={stop}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              )}

              {filtersList[visibleFilterIndex] === "departure" && (
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Departure Time
                  </Typography>
                  <List>
                    {[
                      "All",
                      "Morning (6 AM - 12 PM)",
                      "Afternoon (12 PM - 6 PM)",
                      "Evening (6 PM - 12 AM)",
                      "Night (12 AM - 6 AM)",
                    ].map((time) => (
                      <ListItem
                        key={time}
                        button
                        onClick={() =>
                          handleDepartureTimeChange(
                            time === "All"
                              ? null
                              : time.split(" ")[0].toLowerCase()
                          )
                        }
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                filters.departureTime ===
                                (time === "All"
                                  ? null
                                  : time.split(" ")[0].toLowerCase())
                              }
                              onChange={() =>
                                handleDepartureTimeChange(
                                  time === "All" ? null : time
                                )
                              }
                            />
                          }
                          label={time}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : (
        // Row layout with Popover for medium and large screens
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {filtersList.map((filter) => (
            <Grid item key={filter}>
              <Button
                variant="outlined"
                onClick={(e) => handlePopoverOpen(e, filter)}
                endIcon={
                  isPopoverOpen(filter) ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )
                }
              >
                {filter === "price" && "Price Range"}
                {filter === "stops" && "Stops"}
                {filter === "airlines" && "Airlines"}
                {filter === "departure" && "Departure Time"}
              </Button>
              <Popover
                open={isPopoverOpen(filter)}
                anchorEl={anchorEl[filter]}
                onClose={() => handlePopoverClose(filter)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Box sx={{ p: 2, width: 300 }}>
                  {filter === "price" && (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Price Range
                      </Typography>
                      <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                      />
                      <Typography variant="body2">
                        ${filters.minPrice} - ${filters.maxPrice}
                      </Typography>
                    </>
                  )}

                  {filter === "stops" && (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Stops
                      </Typography>
                      <List>
                        {["All", "Non-stop", "1 stop", "2 stops"].map(
                          (stop) => {
                            const stopValue =
                              stop === "All"
                                ? null
                                : stop === "Non-stop"
                                ? 0
                                : parseInt(stop) || null;

                            return (
                              <ListItem key={stop} disablePadding>
                                <ListItemButton
                                  onClick={() => handleStopsChange(stopValue)}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={filters.stops === stopValue}
                                        onChange={() =>
                                          handleStopsChange(stopValue)
                                        }
                                      />
                                    }
                                    label={stop}
                                  />
                                </ListItemButton>
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                    </>
                  )}

                  {/* {filter === "departure" && (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Departure Times
                      </Typography>
                      <List>
                        {["All", "Morning (6 AM - 12 PM)", "Afternoon (12 PM - 6 PM)", "Evening (6 PM - 12 AM)", "Night (12 AM - 6 AM)"].map((time) => (
                          <ListItem
                            key={time}
                            button
                            onClick={() => handleDepartureTimeChange(time === "All" ? null : time.split(" ")[0].toLowerCase())}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters.departureTime === time}
                                  onChange={() => handleDepartureTimeChange(time === "All" ? null : time.split(" ")[0].toLowerCase())}
                                />
                              }
                              label={time}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )} */}

                  {filter === "departure" && (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Departure Times
                      </Typography>
                      <List>
                        {[
                          "All",
                          "Morning (6 AM - 12 PM)",
                          "Afternoon (12 PM - 6 PM)",
                          "Evening (6 PM - 12 AM)",
                          "Night (12 AM - 6 AM)",
                        ].map((time) => (
                          <ListItem
                            key={time}
                            button
                            onClick={() =>
                              handleDepartureTimeChange(
                                time === "All"
                                  ? null
                                  : time.split(" ")[0].toLowerCase()
                              )
                            }
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    filters.departureTime ===
                                    (time === "All"
                                      ? null
                                      : time.split(" ")[0].toLowerCase())
                                  }
                                  onChange={() =>
                                    handleDepartureTimeChange(
                                      time === "All" ? null : time
                                    )
                                  }
                                />
                              }
                              label={time}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Box>
              </Popover>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Filters;
