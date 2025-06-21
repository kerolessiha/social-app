import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Oooooooooops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={goHome}>
        Back to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
