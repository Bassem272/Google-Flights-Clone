import React from "react";
import { Container, Grid, Typography, Link, Box, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        padding: "16px 0",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} Google Flights Clone
            </Typography>
          </Grid>

          <Grid item>
            <Grid
              container
              spacing={2}
              justifyContent={{ xs: "center", sm: "flex-end" }}
              flexWrap="wrap"
            >
              {["Privacy Policy", "Terms of Service", "About", "Help"].map(
                (text, index) => (
                  <Grid item key={index}>
                    <Link href="#" color="inherit" underline="hover">
                      {text}
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 1 }} />
        <Typography variant="body2" color="textSecondary" align="center">
          This is a Google Flights clone. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
