import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1976D2",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2025 by Kero Siha. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
