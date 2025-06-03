import { useNavigate } from "react-router-dom"
import {
  Box,
} from "@mui/material"
import {
  CheckCircle,
  People,
  Business,
  Schedule,
  BarChart,
  Speed,
} from "@mui/icons-material"
import FeaturesSection from "./FeaturesSection"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import PricingSection from "./PricingSection"
import StatsSection from "./StatSection"
import TestimonialsSection from "./TestimonialsSection"


const Home = () => {
  const navigate = useNavigate()
  const testimonials = [
    {
      quote:
        "This platform revolutionized our hiring process! We've reduced our time-to-hire by 65% and improved candidate quality dramatically.",
      author: "Sarah Johnson",
      position: "HR Director, TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "I landed my dream job in just days! The AI matching was spot-on and connected me with a company that perfectly aligned with my skills and values.",
      author: "John Doe",
      position: "Software Engineer",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "As a startup founder, I needed to build a team quickly. This platform helped me find pre-vetted talent that fit our culture and technical needs.",
      author: "Lisa Chen",
      position: "CEO, InnovateTech",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const stats = [
    { value: "85%", label: "Faster Hiring", icon: <Schedule fontSize="large" /> },
    { value: "93%", label: "Better Matches", icon: <CheckCircle fontSize="large" /> },
    { value: "10,000+", label: "Companies", icon: <Business fontSize="large" /> },
    { value: "1M+", label: "Candidates", icon: <People fontSize="large" /> },
  ]

  
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Ideal for teams just starting their hiring journey.",
      features: [
        "Up to 50 resumes per month",
        "AI-powered resume analysis",
        "Basic coding test",
        "Summary report per candidate",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$99",
      description: "For growing teams hiring developers efficiently.",
      features: [
        "Unlimited resume uploads",
        "Automated resume analysis + technical scoring",
        "Code assessments with AI review",
        "Schedule video interviews",
        "Access to candidate dashboard",
      ],
      cta: "Start Hiring",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom solution for enterprise-scale recruitment.",
      features: [
        "Custom-tailored resume analysis",
        "Integration with existing systems (API)",
        "Dedicated support & service",
        "Advanced code evaluation + GitHub review",
        "Real-time video interview platform",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];
  
  const steps = [
    {
      title: "Upload Your file",
      description: "upload your resume or CV in any format.",
      icon: <Business fontSize="large" />,
    },
    {
      title: "AI-Powered Matching",
      description: "Our AI analyzes candidates by their resume.",
      icon: <BarChart fontSize="large" />,
    },
    {
      title: "Code Challenge",
      description: "Get a coding challenge to assess their skills.",
      icon: <Speed fontSize="large" />,
    },
    
  ]
  const features = [
    {
      icon: <BarChart sx={{ fontSize: 48 }} />,
      title: "AI-Powered Insights",
      description:
        "Our advanced AI analyzes resumes and job descriptions to find perfect matches based on skills, experience, and  culture.",
      color: "linear-gradient(to right, #0066ff, #3385ff)",
    },
    {
      icon: <CheckCircle sx={{ fontSize: 48 }} />,
      title: "Code Quality Review",
      description:
        "Automatically assess code samples from candidates with our AI that evaluates quality, style, and problem-solving approaches.",
      color: "linear-gradient(to right, #00ccff, #33ddff)",
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: "Fast Hiring Process",
      description:
        "Reduce your time-to-hire by up to 70% with automated screening,  and candidate evaluation tools.",
      color: "linear-gradient(to right, #00ccff, #00ffcc)",
    },
    {
      icon: <Schedule sx={{ fontSize: 48 }} />,
      title: "Making interview inside the app",
      description:"your interview will be conducted inside the app, with a built-in video conferencing tool and screen sharing.",
      color: "linear-gradient(to right, #00ccff, #33ddff)",
    },
 
  ]

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <HeroSection />
      <StatsSection stats={stats} />
      <FeaturesSection features={features} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection plans={plans} navigate={navigate} />
    </Box>
  )
}

export default Home
