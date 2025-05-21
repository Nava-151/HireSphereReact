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
import PricingSection from "./HomePage/PricingSection"
import StatsSection from "./HomePage/StatSection"
import TestimonialsSection from "./HomePage/TestimonialsSection"
import HeroSection from "./HomePage/HeroSection"
import HowItWorksSection from "./HomePage/HowItWorksSection"
import FeaturesSection from "./HomePage/FeaturesSection"


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
      description: "Perfect for small businesses",
      features: ["Up to 5 job postings", "Basic AI matching", "Email support", "7-day candidate history"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      description: "Ideal for growing teams",
      features: [
        "Up to 20 job postings",
        "Advanced AI matching",
        "Code quality assessment",
        "Priority support",
        "30-day candidate history",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited job postings",
        "Custom AI training",
        "API access",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

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
