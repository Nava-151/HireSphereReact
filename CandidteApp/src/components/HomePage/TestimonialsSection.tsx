import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, Box, Card, CardContent, Chip, Container, FormatQuote, Rating, styled, Typography } from "../../MuiImports"

const GradientText = styled(Typography)(() => ({
  background: `linear-gradient(90deg, #00B894, #0984E3, #00CEC9)`, 
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
  fontWeight: 700,
  letterSpacing: 1,
}))

const FeatureChip = styled(Chip)(() => ({
  backgroundColor: `#00B89422`, 
  color: "#00B894",
  fontWeight: 600,
  borderRadius: 8,
  padding: "6px 16px",
  fontSize: 14,
  boxShadow: `0 2px 6px #00B89433`,
  userSelect: "none",
}))

const TestimonialDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: active
    ? `linear-gradient(90deg, #00B894, #0984E3, #00CEC9)`
    : "#ccc",
  boxShadow: active ? `0 0 8px #00B894` : "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
}))

interface Testimonial {
  avatar: string
  author: string
  position: string
  rating: number
  quote: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <Box
      id="testimonials"
      sx={{
        py: 10,
        background: "linear-gradient(135deg, rgba(0, 184, 148, 0.05), rgba(9, 132, 227, 0.05))",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <FeatureChip label="Testimonials" sx={{ mb: 2 }} />
            <GradientText variant="h2" gutterBottom>
              What Our Users Say
            </GradientText>
            <Typography variant="h6" color="text.secondary">
              Join thousands of companies and candidates who have transformed their hiring experience.
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Box sx={{ position: "relative", height: { xs: 350, sm: 300 } }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  display: activeTestimonial === index ? "block" : "none",
                }}
              >
                <Card sx={{ p: 1, boxShadow: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.author} sx={{ width: 64, height: 64, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <FormatQuote sx={{ color: "#00B89480", opacity: 0.3, mr: 1, fontSize: 30 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                        "{testimonial.quote}"
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
            {testimonials.map((_, index) => (
              <TestimonialDot
                key={index}
                active={activeTestimonial === index}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TestimonialsSection
