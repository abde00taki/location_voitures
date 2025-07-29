// components/PageLoader.jsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CircularProgress size={60} sx={{ color: "rgba(251, 138, 1, 1)" }} />
    </Box>
  );
}
