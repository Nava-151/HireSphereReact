import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Avatar,
  Rating,
  IconButton,
  Chip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { CheckCircle, ChevronRight, People, ArrowForward } from "@mui/icons-material"

const GradientText = styled(Typography)(({  }) => ({
  background: `linear-gradient(135 degrees, #00f2fe, #03e7a0)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
}))

const GradientButton = styled(Button)(() => ({
  background: `linear-gradient(to right, #00ffcc, #00f2fe)`,
  color: "#ffffff",
  "&:hover": {
    background: `linear-gradient(to right, #009977, #00f2fe)`,
  },
}))


const SuccessChip = styled(Chip)(() => ({
  backgroundColor: `#0066ff22`,
  color: "#0044cc",
  fontWeight: 500,
}))

const CardGradientBorder = styled(Box)(() => ({
  height: 4,
  background: `linear-gradient(135 degrees, #00f2fe, #03e7a0)`,
  width: "100%",
}))

const HeroBackground = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `#ffffff`,   
  zIndex: -1,
}))

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        pb: { xs: 8, md: 10 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <HeroBackground />
      <Container>
        <Grid container  alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* <FeatureChip label="AI-Powered Hiring Platform" sx={{ mb: 2 }} /> */}
              <Typography variant="h1" component="h1" gutterBottom>
                <GradientText>Smarter Hiring,</GradientText>
                <br />
                <Box component="span" sx={{ color: "text.primary" }}>
                  Faster Decisions
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                Our AI-powered platform matches the right talent with the right opportunities, reducing hiring time by
                85% and improving candidate quality.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <GradientButton
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/register")}
                  endIcon={<ChevronRight />}
                  sx={{ borderRadius: 6, py: 1.5 }}>
                  Get Started Free
                </GradientButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3, color: "text.secondary" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircle sx={{ color: "secondary.main", mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">No credit card required</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircle sx={{ color: "secondary.main", mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">Free 14-day trial</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ position: "relative" }}>
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardGradientBorder />
                  <CardHeader
                    title="Candidate Matches"
                    subheader="Based on your job requirements"
                    action={<SuccessChip label="5 New Matches" size="small" />}
                  />
                  <CardContent>
                    {[1, 2, 3].map((item) => (
                      <Paper
                        key={item}
                        elevation={0}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          mb: 1,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          "&:hover": { bgcolor: "action.hover" },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#00ffcc22",
                            background: "linear-gradient(to right, #00ffcc10, #0066ff10)",
                            mr: 2,
                          }}
                        >
                          <People sx={{ color: "#0066ff" }} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle1" fontWeight={500}>
                              Candidate {item}
                            </Typography>
                            <Rating value={5} readOnly size="small" />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Senior Developer • 98% match
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <ArrowForward fontSize="small" />
                        </IconButton>
                      </Paper>
                    ))}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2, color: "#0066ff", borderColor: "#0066ff" }}
                    >
                      View All Candidates
                    </Button>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: -24,
                    right: -24,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "linear-gradient(to right, #00ffcc, #0066ff)",
                    opacity: 0.2,
                    filter: "blur(40px)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -24,
                    left: -24,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "linear-gradient(to right, #00ffcc, #0066ff)",
                    opacity: 0.2,
                    filter: "blur(40px)",
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HeroSection
