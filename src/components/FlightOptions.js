import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Menu,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonIcon from "@mui/icons-material/Person";
import AllOutRoundedIcon from "@mui/icons-material/AllOutRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FlightOptions = ({
  tripType,
  setTripType,
  passengers,
  setPassengers,
  flightClass,
  setFlightClass,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  };

  const handleClose = () => {
    setShowMenu(false);
  };
  const [message, setMessage] = useState("");
  const handlePassengerChange = (type, newCount) => {
    const totalPassengers =
      (type === "adults" ? newCount : passengers.adults) +
      (type === "children" ? newCount : passengers.children) +
      (type === "infants" ? newCount : passengers.infants) +
      (type === "infantsOnLap" ? newCount : passengers.infantsOnLap);

    if (totalPassengers > 9) {
      setMessage("Total passengers cannot exceed 9");
      return;
    }

    if (newCount >= 0) {
      if (type === "adults" && newCount === 0) {
        setMessage("Must be at least 1 adult");
      } else if (type === "infants" && newCount > passengers.adults * 2) {
        setMessage("Must be 1 adult per 2 infants in seat");
      } else if (type === "infantsOnLap" && newCount > passengers.adults) {
        setMessage("Must be 1 adult per 1 infant on lap");
      } else {
        setMessage("");
        setPassengers((prev) => ({
          ...prev,
          [type]: newCount,
        }));
      }
    }
  };

  const totalPassengers =
    passengers.adults +
    passengers.children +
    passengers.infants +
    passengers.infantsOnLap;

  const handleClassChange = (event) => {
    setFlightClass(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: "10px", sm: "20px" },
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-start" },
        marginTop: { xs: "10px", sm: "20px" },
        marginBottom: { xs: "10px", sm: "20px" },
      }}
    >
      <FormControl sx={{ minWidth: { xs: "100%", sm: "auto" } }}>
        <Select
          value={tripType}
          onChange={handleTripTypeChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            backgroundColor: "transparent",
            "&.MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover": { backgroundColor: "#f5f5f5" },
              "&.Mui-focused": { backgroundColor: "#e3f2fd" },
            },
          }}
        >
          <MenuItem value="one-way">
            <ArrowRightAltIcon sx={{ marginRight: 1 }} />
            One-Way
          </MenuItem>
          <MenuItem value="round-trip">
            <SwapHorizIcon sx={{ marginRight: 1 }} />
            Round Trip
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: { xs: "100%", sm: "10%" } }}>
        <Button
          onClick={handleOpen}
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "#f5f5f5" },
            "&:focus": { backgroundColor: "#e3f2fd" },
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", color: "slategray" }}
          >
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{totalPassengers}</Typography>
          </Box>
          <ArrowDropDownIcon
            sx={{
              transform: showMenu ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={showMenu}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{ sx: { width: "300px", padding: "16px" } }}
        >
          {[
            { label: "Adults", key: "adults" },
            { label: "Children", key: "children", subtext: "age 2-11" },
            { label: "Infants", key: "infants", subtext: "In Seat" },
            { label: "Infants", key: "infantsOnLap", subtext: "On Lap" },
          ].map(({ label, key, subtext }) => (
            <MenuItem
              key={key}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="body1">{label}</Typography>
                {subtext && (
                  <Typography variant="caption" color="text.secondary">
                    {subtext}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={() =>
                    handlePassengerChange(key, passengers[key] + 1)
                  }
                  size="small"
                >
                  <AddIcon />
                </Button>
                <Typography variant="body1">{passengers[key]}</Typography>
                <Button
                  onClick={() =>
                    handlePassengerChange(key, passengers[key] - 1)
                  }
                  size="small"
                  disabled={passengers[key] <= 0}
                >
                  <RemoveIcon />
                </Button>
              </Box>
            </MenuItem>
          ))}
          {message && (
            <Typography sx={{ color: "red" }} variant="caption">
              {message}
            </Typography>
          )}

          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              marginTop: "16px",
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "8px 0",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#f5f5f5" },
              "&:focus": { backgroundColor: "#e3f2fd" },
            }}
          >
            Close
          </Button>
        </Menu>
      </FormControl>

      <FormControl sx={{ minWidth: { xs: "100%", sm: "auto" } }}>
        <Select
          value={flightClass}
          onChange={handleClassChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            backgroundColor: "transparent",
            "&.MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover": { backgroundColor: "#f5f5f5" },
              "&.Mui-focused": { backgroundColor: "#e3f2fd" },
            },
          }}
        >
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="premium">Premium</MenuItem>
          <MenuItem value="first">First Class</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FlightOptions;
