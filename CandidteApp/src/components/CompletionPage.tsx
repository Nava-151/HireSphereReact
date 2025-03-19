import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompletionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 5, minHeight: "100vh", background: "#fff", color: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3" sx={{ color: "#00ff99", textAlign: "center" }}>🎉 Thank You !</Typography>
      <Typography variant="h6" sx={{ color: "#bbb", mt: 2, textAlign: "center" }}>We have finished  the process we hope the employers to contact uou soon</Typography>
      <Button onClick={() => navigate("/")} variant="contained" sx={{ mt: 4, background: "linear-gradient(90deg, #00eaff, #00ff99)" }}>🏠 Back to Home</Button>
    </Container>
  );
};

export default CompletionPage;
