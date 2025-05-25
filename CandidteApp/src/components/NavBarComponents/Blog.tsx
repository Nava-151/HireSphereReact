
import { motion } from "framer-motion";
import { Box, Button, Card, CardContent, Container, Typography,CardMedia } from "../../MuiImports";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Hiring",
      description:
        "Discover how artificial intelligence is transforming the hiring process.",
      link: "https://hbr.org/2023/07/the-potential-and-pitfalls-of-ai-in-hiring",
      image: "/Ai.webp",
    },
    {
      title: "Resume Optimization Tips",
      description:
        "Learn how to make your resume stand out to AI and recruiters.",
      link: "https://www.linkedin.com/pulse/how-optimize-your-resume-ats-ai-2023-guide-john-doe",
      image: "/tips.png",
    },
    {
      title: "Top Skills for Developers in 2025",
      description:
        "Stay ahead of the curve with these must-have skills.",
      link: "https://www.coursera.org/articles/top-developer-skills",
      image: "/best-soft-skills.webp",
    },
  ];

  return (
    <Container sx={{ marginTop: "60px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "40px", color: "#00eaff" }}
      >
        Latest Blog Posts
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        alignItems="stretch"
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card
              sx={{
                width: 300,
                height: "100%",
                border: "2px solid #00eaff",
                display: "flex",
                flexDirection: "column",
              }}
              elevation={3}
            >
              <CardMedia
                component="img"
                height="160"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.description}</Typography>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Button
                  variant="contained"
                  sx={{ background: "#00eaff", color: "black" }}
                  href={post.link}
                  target="_blank"
                >
                  Read More
                </Button>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default Blog;
