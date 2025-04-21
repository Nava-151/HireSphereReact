import {
  Button,
  Container,
  Grid,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="main-container">
      <br />
      <div className="hero">
        <h1>Smarter Hiring, Faster Decisions</h1>
        <p>AI-powered resume analysis and job matching for tech professionals.</p>
        <Button variant="contained" color="secondary" size="large" className="cta-button" onClick={() => { navigate('/register') }}>
          Get Started
        </Button>
      </div>

      <br />
      <Container className="features">
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className="feature-card">
                <CardContent>
                  {feature.icon}
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <br />
      <Container className="testimonials">
        <Typography variant="h4">What Our Users Say</Typography>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="testimonial-card">
            <CardContent>
              <Typography>"{testimonial.quote}"</Typography>
              <strong>- {testimonial.author}</strong>
            </CardContent>
          </Card>
        ))}
      </Container>


      {/* How It Works */}
      <Container className="how-it-works">
        <div className="space">

          <Typography variant="h4">How It Works</Typography>
          <Stepper activeStep={-1} alternativeLabel>
            {steps
            .map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Container>

      <Container className="faq">
        <Typography variant="h4">Frequently Asked Questions</Typography>
        {faqs.map((faqu, index) => (
          <div className="space">
            <Accordion key={index}>

              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faqu.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faqu.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>

        ))}
        <Box sx={{ height: "350px" }}></Box>
      </Container>
    </div>

  );
};
export default Home;
