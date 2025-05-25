import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from "../../MuiImports"

const primary = "#03e7a0"
const secondary = "#00f2fe"

type Feature = {
  title: string
  description: string
  icon: ReactNode
  color?: string
}

type FeaturesSectionProps = {
  features: Feature[]
}

const GradientText = styled(Typography)({
  background: `linear-gradient(to right, ${secondary}, ${primary})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
})

const FeatureChip = styled(Chip)({
  backgroundColor: `${primary}10`,
  color: primary,
  fontWeight: 500,
})

const CardGradientBorder = styled(Box)<{ color?: string }>(({ color }) => ({
  height: 4,
  background: color || primary,
  width: "100%",
}))

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <Box
      id="features"
      sx={{
        py: 10,
        background: "linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(0, 255, 204, 0.05))",
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
            <FeatureChip label="Features" sx={{ mb: 2 }} />
            <GradientText variant="h2" gutterBottom>
              Everything You Need to Hire Smarter
            </GradientText>
            <Typography variant="h6" color="text.secondary">
              Our platform combines AI technology with human expertise to streamline your hiring process.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardGradientBorder color={feature.color || primary} />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ color: feature.color || primary, mb: 3 }}>{feature.icon}</Box>
                    <Typography variant="h4" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default FeaturesSection
