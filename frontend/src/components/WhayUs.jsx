import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { FaRocket, FaShieldAlt, FaThumbsUp, FaHeadset } from "react-icons/fa";

const features = [
    {
        icon: <FaRocket size={32} color="rgba(251, 138, 1, 1)" />,
        title: "Fast & Easy Booking",
        desc: "Book your car in minutes with our streamlined process and responsive platform.",
    },
    {
        icon: <FaShieldAlt size={32} color="rgba(251, 138, 1, 1)" />,
        title: "Trusted & Secure",
        desc: "We ensure complete security and trust with verified vehicles and insured rentals.",
    },
    {
        icon: <FaThumbsUp size={32} color="rgba(251, 138, 1, 1)" />,
        title: "Top Rated Service",
        desc: "Our users love us! We consistently deliver high-quality service and satisfaction.",
    },
    {
        icon: <FaHeadset size={32} color="rgba(251, 138, 1, 1)" />,
        title: "24/7 Customer Support",
        desc: "Got questions? Our team is available around the clock to help you anytime.",
    },
];

export default function ServiceFeatures() {
    return (
        <Box sx={{ my: 6, px: { xs: 2, md: 6 } }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
                Why Choose Us?
            </Typography>

            <Grid container columns={{ xs: 12, sm: 12, md: 12 }} spacing={4}>
                {features.map((feature, index) => (
                    <Grid span={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                p: 2,
                                borderRadius: 4,
                                textAlign: "center",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 6px 24px rgba(251, 138, 1, 0.3)",
                                },
                            }}
                        >
                            <Box mb={2}>{feature.icon}</Box>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
