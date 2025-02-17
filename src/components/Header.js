import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: { xs: "auto", md: "60vh" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f8f9fa",
        padding: { xs: "5vh 5vw", md: "0 5vw" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "40vh", md: "100%" },
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/Airport.svg"
          alt="People pointing at a high-flying plane"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: { xs: 0, md: "5%" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#202124" }}>
          Find the best flights fast ✈️
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#5f6368", margin: "10px 0 20px", lineHeight: 1.6 }}
        >
          Compare prices from hundreds of travel sites and book your next trip
          with confidence.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1a73e8",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "25px",
            width: "fit-content",
            ":hover": {
              backgroundColor: "#135abc",
            },
          }}
        >
          Start Searching
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
