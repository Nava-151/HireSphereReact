import React, { useState } from "react";
import { Box, Container, Typography, IconButton, TextField, Button, Grid } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#222", // רקע כהה
        color: "#fff",
        py: 4,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* טופס צור קשר */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
              Contact Us
            </Typography>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
            >
              <TextField
                label="Your Name"
                name="name"
                variant="filled"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ backgroundColor: "#333", borderRadius: "5px", input: { color: "#fff" }, label: { color: "#bbb" } }}
              />
              <TextField
                label="Your Email"
                name="email"
                variant="filled"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ backgroundColor: "#333", borderRadius: "5px", input: { color: "#fff" }, label: { color: "#bbb" } }}
              />
              <TextField
                label="Your Message"
                name="message"
                variant="filled"
                multiline
                rows={3}
                value={formData.message}
                onChange={handleChange}
                fullWidth
                sx={{ backgroundColor: "#333", borderRadius: "5px", input: { color: "#fff" }, label: { color: "#bbb" } }}
              />
              <motion.div
                whileHover={{
                  background: "linear-gradient(90deg, #00ff99, #00eaff)",
                  boxShadow: "0px 0px 15px rgba(0, 255, 153, 0.8), 0px 0px 15px rgba(0, 234, 255, 0.8)",
                }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "5px", width: "100%" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    background: "linear-gradient(90deg, #00ff99, #00eaff)", // רקע מעבר
                    color: "#000",
                    "&:hover": {
                      background: "linear-gradient(90deg, #00eaff, #00ff99)", // שינוי כיוון במעבר עכבר
                    },
                  }}
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </Grid>

          {/* קישורים חברתיים */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "right" }}>
              Follow Us
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }} mt={1} gap={1.5}>
              {[
                { icon: <GitHub />, link: "https://github.com" },
                { icon: <LinkedIn />, link: "https://linkedin.com" },
                { icon: <Twitter />, link: "https://twitter.com" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.2,
                    background: "linear-gradient(90deg, #00ff99, #00eaff)",
                    boxShadow: "0px 0px 15px rgba(0, 255, 153, 0.8), 0px 0px 15px rgba(0, 234, 255, 0.8)",
                  }}
                  style={{
                    borderRadius: "50%",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s ease-in-out",
                  }}
                >
                  <IconButton href={item.link} target="_blank" sx={{ color: "white" }}>
                    {item.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
