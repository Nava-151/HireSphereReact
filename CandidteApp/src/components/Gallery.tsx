import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    CardMedia,
  } from "@mui/material";
  import { motion } from "framer-motion";
  
  const tips = [
    {
      title: "Dress Professionally",
      description: "Wearing professional attire creates a strong first impression.",
      image: "/tip2.webp"
    },
    {
      title: "Prepare for Common Questions",
      description: "Practice answers for common interview questions to boost confidence.",
      image: "/tip2.2.webp"
    },
    {
      title: "Research the Company",
      description: "Understanding the company's vision and goals helps in answering effectively.",
      image: "/tip3.webp",
    },
    {
      title: "Body Language Matters",
      description: "Maintain eye contact, sit upright, and use positive gestures.",
      image: "/tip4.2.webp",
    },
    {
      title: "Ask Insightful Questions",
      description: "Prepare a few thoughtful questions to ask the interviewer.",
      image: "/tip4.webp",
    },
  ];
  
  const Gallery = () => {
    return (
      <Container sx={{ marginTop: "60px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", color: "#00eaff" }}>
          Interview Tips & Gallery
        </Typography>
  
        {/* ✅ שימוש ב-Box עם Grid רספונסיבי */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",       // מסך קטן: עמודה אחת
            sm: "1fr 1fr",   // מסך בינוני: 2 עמודות
            md: "1fr 1fr 1fr" // מסך גדול: 3 עמודות
          }}
          gap={3}
          justifyContent="center"
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card sx={{ padding: "10px", border: "2px solid #00eaff" }}>
                <CardMedia component="img" height="200" image={tip.image} alt={tip.title} />
                <CardContent>
                  <Typography variant="h6">{tip.title}</Typography>
                  <Typography>{tip.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    );
  };
  
  export default Gallery;
  