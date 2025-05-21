// import React from "react";
// import { Container, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const CompletionPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Container sx={{ py: 5, minHeight: "100vh", background: "#fff", color: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//       <Typography variant="h3" sx={{ color: "#00ff99", textAlign: "center" }}>🎉 Thank You !</Typography>
//       <Typography variant="h6" sx={{ color: "#bbb", mt: 2, textAlign: "center" }}>We have finished  the process we hope the employers to contact uou soon</Typography>
//       <Button onClick={() => navigate("/")} variant="contained" sx={{ mt: 4, background: "linear-gradient(90deg, #00eaff, #00ff99)" }}>🏠 Back to Home</Button>
//     </Container>
//   );
// };

// export default CompletionPage;
import React, { useEffect } from "react";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fade
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Home, Email, AccessTime, Star } from "@mui/icons-material";
import confetti from "canvas-confetti";

const CompletionPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti effect when component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Create confetti with custom colors
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00eaff', '#00ff99', '#ffffff'],
        disableForReducedMotion: true
      });
      
      confetti({
        particleCount,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.7 },
        colors: ['#00eaff', '#00ff99', '#ffffff'],
        disableForReducedMotion: true
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 8, 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, rgba(0,234,255,0.05), rgba(0,255,153,0.05))",
        color: "black", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <Fade in={true} timeout={1000}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            borderRadius: 4, 
            background: "white",
            border: "1px solid rgba(0,234,255,0.3)",
            boxShadow: "0 10px 30px rgba(0,234,255,0.1)"
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                margin: "0 auto", 
                background: "linear-gradient(90deg, #00eaff, #00ff99)",
                boxShadow: "0 4px 20px rgba(0,255,153,0.3)"
              }}
            >
              <CheckCircle fontSize="large" />
            </Avatar>
            
            <Typography 
              variant="h3" 
              sx={{ 
                mt: 3,
                fontWeight: 700,
                background: "linear-gradient(90deg, #00eaff, #00ff99)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              🎉 Application Complete!
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#555", 
                mt: 2, 
                fontWeight: 400,
                maxWidth: "500px",
                mx: "auto"
              }}
            >
              Congratulations! Your application has been successfully submitted and is now being reviewed by potential employers.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4, borderColor: "rgba(0,234,255,0.2)" }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: "#333"
              }}
            >
              What happens next?
            </Typography>
            
            <List>
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <Email sx={{ color: "#00eaff" }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Confirmation Email" 
                  secondary="You'll receive a confirmation email with your application details"
                />
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <AccessTime sx={{ color: "#00d4ff" }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Review Period" 
                  secondary="Employers will review your application within 3-5 business days"
                />
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <Star sx={{ color: "#00ff99" }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Interview Invitations" 
                  secondary="Interested employers will contact you directly to schedule interviews"
                />
              </ListItem>
            </List>
          </Box>
          
          <Box 
            sx={{ 
              background: "linear-gradient(90deg, rgba(0,234,255,0.1), rgba(0,255,153,0.1))",
              p: 3,
              borderRadius: 2,
              mb: 4
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500, color: "#444" }}>
              💡 <strong>Pro Tip:</strong> Keep your profile updated and check your email regularly for communications from potential employers. Make sure to add our domain to your safe senders list.
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button 
              onClick={() => navigate("/")} 
              variant="contained" 
              startIcon={<Home />}
              sx={{ 
                py: 1.5,
                px: 4,
                background: "linear-gradient(90deg, #00eaff, #00ff99)",
                borderRadius: "50px",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 20px rgba(0,255,153,0.3)"
                }
              }}
            >
              Back to Home
            </Button>
          
          </Box>
        </Paper>
      </Fade>
      
      <Typography variant="body2" sx={{ mt: 4, color: "#888", textAlign: "center" }}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
        <br />
        Need help? <a href="#" style={{ color: "#00eaff", textDecoration: "none" }}>Contact Support</a>
      </Typography>
    </Container>
  );
};

export default CompletionPage;
