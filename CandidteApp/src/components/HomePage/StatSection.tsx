import { Box, Container, Typography, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"

const StatsCircle = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: `linear-gradient(to right, #03e7a0, #00f2fe)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}))

interface Stat {
    icon: React.ReactNode
    value: string | number
    label: string
}

interface StatsSectionProps {
    stats: Stat[]
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    return (
        <Box sx={{ py: 8, bgcolor: "background.default" }}>
            <Container>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Box sx={{ textAlign: "center" }}>
                                    <StatsCircle>{stat.icon}</StatsCircle>
                                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default StatsSection

