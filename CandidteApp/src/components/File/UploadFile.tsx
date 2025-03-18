// React Component
import React, { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('https://localhost:5071/files/upload', {
        params: { fileName: file.name },
      });

      const presignedUrl = (response.data as { url: string }).url;

      // שלב 2: יצירת XMLHttpRequest להעלאה עם מעקב התקדמות
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          alert('הקובץ הועלה בהצלחה!');
        } else {
          console.error('שגיאה בהעלאה:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('שגיאה ברשת בעת ההעלאה.');
      };

      xhr.open('PUT', presignedUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    } catch (error) {
      console.error('שגיאה בקבלת Presigned URL:', error);
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
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
          sx={{
            width: "100%",
            maxWidth: 400,
            height: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #4CAF50",
            borderRadius: 3,
            cursor: "pointer",
            transition: "all 0.3s",
            '&:hover': {
              borderColor: "#2196F3",
              background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
            },
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            backgroundColor: "#ffffff"
          }}
        >
          <CloudUploadIcon sx={{ color: "#03A9F4", fontSize: 50, animation: "pulse 1.5s infinite" }} />
          <Typography variant="body1" sx={{ color: "#4CAF50", mt: 1, fontWeight: "bold" }}>
            drag here or click to upload
          </Typography>
          <input type="file" hidden onChange={handleFileChange} id="file-upload" />
          <Button component="label" htmlFor="file-upload" sx={{ mt: 2, bgcolor: "#4CAF50", color: "#fff", '&:hover': { bgcolor: "#388E3C" } }}>
            select file        </Button>
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