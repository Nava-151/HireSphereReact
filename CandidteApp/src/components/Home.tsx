import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Collapse
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    { icon: <AnalyticsIcon fontSize="large" />, title: "AI-Powered Insights", description: "Smart resume & job match analysis" },
    { icon: <VerifiedIcon fontSize="large" />, title: "Code Quality Review", description: "Automated code assessment for developers" },
    { icon: <SpeedIcon fontSize="large" />, title: "Fast Hiring Process", description: "Find the right candidate in minutes" },
  ];

  const testimonials = [
    { quote: "This platform revolutionized our hiring process!", author: "HR Manager, TechCorp" },
    { quote: "I landed my dream job in just days!", author: "John Doe, Software Engineer" },
  ];

  const steps = [
    { title: "Upload Your Resume", description: "Simply drag and drop your CV." },
    { title: "AI-Powered Analysis", description: "We analyze your skills and experience." },
    { title: "Get Matched", description: "Find the best job opportunities for you." },
  ];

  const faqs = [
    { question: "How does the AI work?", answer: "Our AI scans your resume for keywords, skills, and job compatibility." },
    { question: "Is this platform free?", answer: "Yes, job seekers can use the basic features for free!" },
  ];

  const neonText = {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#fff" }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Smarter Hiring, Faster Decisions
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          AI-powered resume analysis and job matching for tech professionals.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#00ffcc", color: "#000", "&:hover": { backgroundColor: "#00e6b8" } }}
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ textAlign: "center", mb: 6 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3} justifyContent="center">
          {features.map((feature, index) => (
            <Card key={index} sx={{ p: 2, width: 300, mx: "auto", backgroundColor: "#f0f0f0" }}>
              <CardContent>
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>{feature.title}</Typography>
                <Typography>{feature.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Testimonials */}
      <Container sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" sx={{ ...neonText, mb: 2 }}>What Our Users Say</Typography>
        {testimonials.map((testimonial, index) => (
          <Card key={index} sx={{ p: 2, mb: 2, maxWidth: 600, mx: "auto", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography>"{testimonial.quote}"</Typography>
              <strong>- {testimonial.author}</strong>
            </CardContent>
          </Card>
        ))}
      </Container>

      {/* How It Works */}
      <Container sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" sx={{ ...neonText, mb: 2 }}>How It Works</Typography>
        <Stepper activeStep={-1} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      {/* FAQ Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ ...neonText, mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => {
          const [expanded, setExpanded] = useState(false);
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={{
                  background: "linear-gradient(135deg, #00ffcc, #00e6b8)",
                  color: "#000",
                  border: "1px solid #00ffcc",
                  transition: "all 0.3s ease-in-out",
                  borderRadius: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <HelpOutlineIcon />
                    <Typography>{faq.question}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Collapse in={expanded}>
                    <Typography>{faq.answer}</Typography>
                  </Collapse>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default Home;
