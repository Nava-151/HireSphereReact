import { motion } from "framer-motion"
import { Box, Chip, Container, Grid, styled, Typography } from "../../MuiImports"

const primary = "#03e7a0"
const secondary = "#00f2fe"

const GradientText = styled(Typography)({
  background: `linear-gradient(to right, ${secondary}, ${primary})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
})

const FeatureChip = styled(Chip)({
  backgroundColor: `${primary}20`,
  color: primary,
  fontWeight: 500,
})

const StepCircle = styled(Box)({
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: `linear-gradient(to right, ${secondary}, ${primary})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  marginBottom: 24,
  boxShadow: `0 10px 25px ${primary}55`,
})

const HowItWorksSection = ({ steps }: { steps: { icon: React.ReactNode; title: string; description: string }[] }) => {
    return (
        <Box id="how-it-works" sx={{ py: 10, bgcolor: "#f8f9fa" }}>
            <Container>
                <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto", mb: 8 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <FeatureChip label="Process" sx={{ mb: 2 }} />
                        <GradientText variant="h2" gutterBottom>
                            How It Works
                        </GradientText>
                        <Typography variant="h6" sx={{ color: "#444" }}>
                            Our streamlined process makes hiring the right talent quick and efficient.
                        </Typography>
                    </motion.div>
                </Box>

                <Box sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            right: 0,
                            height: 2,
                            background: `linear-gradient(to right, ${primary}, ${secondary})`,
                            transform: "translateY(-50%)",
                            display: { xs: "none", md: "block" },
                        }}
                    />
                    <Grid container spacing={6}>
                        {steps.map((step, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Box sx={{ textAlign: "center", position: "relative" }}>
                                        <StepCircle>{step.icon}</StepCircle>
                                        <Typography variant="h5" component="h3" gutterBottom sx={{ color: primary }}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "#555" }}>
                                            {step.description}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default HowItWorksSection

