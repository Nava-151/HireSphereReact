import React, { useState } from "react";
import { Box, Container, Typography, IconButton, TextField, Button } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { buttonStyle } from "../../style/style";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent!\n\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ email: "", message: "" });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box
        component="footer"
        sx={{
          position: "static",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          py: 1,
          backgroundColor: "#121212",
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            {/* Contact Form */}
            <Box flex={1} textAlign="left">
              <Typography variant="body2" sx={{ mb: 0.5, color: "#ccc", fontSize: "12px" }}>
                Contact Us
              </Typography>
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxWidth: "250px", 
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  variant="filled"
                  size="small"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    backgroundColor: "#333",
                    borderRadius: "3px",
                    input: { color: "#fff", fontSize: "12px" },
                    label: { color: "#aaa", fontSize: "12px" },
                  }}
                />
                <TextField
                  label="Message"
                  name="message"
                  variant="filled"
                  size="small"
                  multiline
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    backgroundColor: "#333",
                    borderRadius: "3px",
                    input: { color: "#fff", fontSize: "12px" },
                    label: { color: "#aaa", fontSize: "12px" },
                  }}
                />
                <motion.div
                  whileHover={{
                    background: "linear-gradient(90deg, #00ff99, #00eaff)",
                    boxShadow: "0px 0px 8px rgba(0, 255, 153, 0.6), 0px 0px 8px rgba(0, 234, 255, 0.6)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: "4px", width: "100%" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                     ...buttonStyle,
                      "&:hover": {
                        background: "linear-gradient(90deg, #00eaff, #00ff99)",
                      },
                    }}
                  >
                    Send
                  </Button>
                </motion.div>
              </motion.form>
            </Box>

            {/* Social Links */}
            <Box flex={1} textAlign="right">
              <Typography variant="body2" sx={{ mb: 0.5, color: "#ccc", fontSize: "12px" }}>
                Follow Us
              </Typography>
              <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }} gap={1}>
                {[{ icon: <GitHub />, link: "https://github.com" }, { icon: <LinkedIn />, link: "https://linkedin.com" }, { icon: <Twitter />, link: "https://twitter.com" }].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.15,
                      background: "linear-gradient(90deg, #00ff99, #00eaff)",
                      boxShadow: "0px 0px 8px rgba(0, 255, 153, 0.6), 0px 0px 8px rgba(0, 234, 255, 0.6)",
                    }}
                    style={{
                      borderRadius: "50%",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton href={item.link} target="_blank" sx={{ color: "white" }}>
                      {item.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
