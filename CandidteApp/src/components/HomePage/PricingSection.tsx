import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Divider,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";

const gradient = "linear-gradient(to right, #00f2fe, #03e7a0)";

const GradientText = styled(Typography)(() => ({
    background: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
}));

const GradientButton = styled(Button)(() => ({
    background: gradient,
    color: "#fff",
    fontWeight: 600,
    transition: "background 0.3s ease",
    "&:hover": {
        background: "linear-gradient(135deg, #03e7a0, #00f2fe)",
    },
}));

const FeatureChip = styled(Chip)(() => ({
    background: "linear-gradient(135deg, #03e7a0, #00f2fe, #03e7a0)",
    color: "#fff",
    fontWeight: 600,
    border: "none",
}));

const PricingSection = ({
    plans,
    navigate,
}: {
    plans: Array<{
        name: string;
        price: string;
        description: string;
        features: string[];
        cta: string;
        popular?: boolean;
    }>;
    navigate: (path: string) => void;
}) => {
    return (
        <Box id="pricing" sx={{ py: 10, bgcolor: "#f9f9f9" /* צבע רקע בהיר */ }}>
            <Container>
                <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto", mb: 8 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <FeatureChip label="Pricing" sx={{ mb: 2 }} />
                        <GradientText variant="h2" gutterBottom>
                            Simple, Transparent Pricing
                        </GradientText>
                        <Typography variant="h6" color="text.secondary">
                            Choose the plan that works best for your hiring needs.
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {plans.map((plan, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        position: "relative",
                                        border: "2px solid",
                                        borderImageSlice: 1,
                                        borderImageSource: gradient,
                                        backgroundColor: "#fff",
                                        color: "#111",
                                        overflow: "visible",  
                                        pt: 5, 
                                    }}
                                >
                                    {plan.popular && (
                                        <Chip
                                            label="Most Popular"
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                background: gradient,
                                                color: "#fff",
                                                fontWeight: 500,
                                                zIndex: 10,  
                                            }}
                                        />
                                    )}

                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h4" component="h3" gutterBottom>
                                            {plan.name}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography
                                                variant="h3"
                                                component="span"
                                                fontWeight="bold"
                                                sx={{
                                                    background: gradient,
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                }}
                                            >
                                                {plan.price}
                                            </Typography>
                                            {plan.price !== "Custom" && (
                                                <Typography
                                                    variant="body1"
                                                    component="span"
                                                    color="text.secondary"
                                                    sx={{ ml: 1 }}
                                                >
                                                    /month
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                            {plan.description}
                                        </Typography>
                                        <Divider sx={{ my: 3, borderColor: "#ddd" }} />
                                        <Box
                                            component="ul"
                                            sx={{ listStyle: "none", p: 0, m: 0, mb: 4 }}
                                        >
                                            {plan.features.map((feature, i) => (
                                                <Box
                                                    component="li"
                                                    key={i}
                                                    sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
                                                >
                                                    <CheckCircle
                                                        sx={{ color: "#03e7a0", mr: 1, mt: 0.3 }}
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body1">{feature}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        {plan.popular ? (
                                            <GradientButton
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                onClick={() =>
                                                    navigate(plan.name === "Enterprise" ? "/contact" : "/register")
                                                }
                                            >
                                                {plan.cta}
                                            </GradientButton>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                size="large"
                                                onClick={() =>
                                                    navigate(plan.name === "Enterprise" ? "/contact" : "/register")
                                                }
                                                sx={{
                                                    border: "2px solid",
                                                    borderImageSlice: 1,
                                                    borderImageSource: gradient,
                                                    color: "#03e7a0",
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        backgroundColor: "#e0f7f1",
                                                        borderImageSource: "linear-gradient(135deg, #03e7a0, #00f2fe)",
                                                    },
                                                }}
                                            >
                                                {plan.cta}
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default PricingSection;
