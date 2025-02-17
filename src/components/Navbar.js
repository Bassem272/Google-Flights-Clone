import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "#202124",
        boxShadow: "none",
        borderBottom: "1px solid #dadce0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "6px 12px", md: "8px 16px" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            onClick={handleMenuOpen}
            sx={{
              display: { xs: "block", md: "none" },
              color: "#5f6368",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              color: "#1a73e8",
              marginLeft: { xs: 1, md: 0 },
              whiteSpace: "nowrap",
            }}
          >
            Flights
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              fontSize: { xs: "12px", md: "14px" },
              color: "#5f6368",
              ":hover": { backgroundColor: "#f1f3f4" },
            }}
          >
            Explore
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontSize: { xs: "12px", md: "14px" },
              color: "#5f6368",
              ":hover": { backgroundColor: "#f1f3f4" },
            }}
          >
            My Trips
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1a73e8",
              color: "white",
              textTransform: "none",
              fontSize: { xs: "12px", md: "14px" },
              fontWeight: "bold",
              borderRadius: "20px",
              padding: { xs: "4px 12px", md: "6px 16px" },
              ":hover": { backgroundColor: "#135abc" },
            }}
          >
            Sign in
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem onClick={handleMenuClose}>Explore</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Trips</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
