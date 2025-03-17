import {
    Button,
    Container,
    Box,
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import { motion } from "framer-motion";
  
  const Blog = () => {
    const blogPosts = [
      { title: "The Future of AI in Hiring", description: "Discover how artificial intelligence is transforming the hiring process.", link: "#" },
      { title: "Resume Optimization Tips", description: "Learn how to make your resume stand out to AI and recruiters.", link: "#" },
      { title: "Top Skills for Developers in 2025", description: "Stay ahead of the curve with these must-have skills.", link: "#" }
    ];
    return (
        <Container className="blog" sx={{ marginTop: "60px" }}>
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", color: "#00eaff" }}>Latest Blog Posts</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
            {blogPosts.map((post, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="blog-card" sx={{ padding: "20px", border: "2px solid #00eaff", maxWidth: "300px" }}>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography>{post.description}</Typography>
                    <Button variant="contained" sx={{ marginTop: "10px", background: "#00eaff", color: "black" }} href={post.link}>Read More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
    );
  };
  
  export default Blog;
  