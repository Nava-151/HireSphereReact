// React Component
import React, { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { paperStyle } from '../../style/style';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
const navigate=useNavigate();
  const handleUpload = async () => {
    
    if (!file) return;
    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('http://localhost:5071/files/upload', { params: { fileName: file.name }});

      const presignedUrl :URL= response.data as URL;
      console.log("presignedUrl",presignedUrl);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        console.log("in event");
        
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        }
      };
      const x=progress;
      console.log(x);

      xhr.onload = () => {
        if (xhr.status === 200) {
          alert('the file uploaded successfuly');
          navigate('/tests');
        } else {
          console.error('error in uploading:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error(' error in net while uploading  .');
      };

      xhr.open('PUT', presignedUrl, true);
      // xhr.setRequestHeader('Content-Type', file.type); 
      console.log("file",file.type);
      xhr.send(file);

      analyzeResume(file.name, +localStorage.getItem('userId')!);  

    } catch (error) {
      console.error('error in getting  Presigned URL:', error);
    }
  };
  const analyzeResume = async (s3Key: string, userId: number) => {
    console.log("in analyzeResume");
    
    // try {const response = await axios.post("http://localhost:5071/files/resume/analyze", { s3Key, userId });
    try {
        const response = await axios.post(`http://localhost:5071/files/resume/analyze?s3Key=${encodeURIComponent(s3Key)}&userId=${userId}`);
        console.log("Analysis result:", response.data);
    } catch (error) {
        console.error("Error analyzing resume:", error);
    }
};

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      p={2}
      textAlign="center"
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
        Let's start
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: "#666" }}>
        Step number 1
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: "#666" }}>
        Upload your resume
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#999" }}>
        Only .pdf or .docx extensions
      </Typography>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={500}
      >
        <Paper
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          elevation={6}
         sx={paperStyle}
        >
          <CloudUploadIcon sx={{ color: "#03A9F4", fontSize: 50, animation: "pulse 1.5s infinite" }} />
          <Typography variant="body1" sx={{ color: "#4CAF50", mt: 1, fontWeight: "bold" }}>
            Drag here or click to upload
          </Typography>
          <input type="file" hidden onChange={handleFileChange} id="file-upload" />
          <Button component="label" htmlFor="file-upload" sx={{ mt: 2, bgcolor: "#4CAF50", color: "#fff", '&:hover': { bgcolor: "#388E3C" } }}>
            Select file
          </Button>
          <Button onClick={handleUpload} sx={{ color: "#4CAF50", mt: 1, fontWeight: "bold" }}>Upload</Button>
          {file && (
            <Typography variant="body2" sx={{ color: "#555", mt: 2, wordBreak: "break-word", textAlign: "center" }}>
              {file.name}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default FileUploader;