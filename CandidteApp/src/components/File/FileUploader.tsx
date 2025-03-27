
import React, { useState } from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // <-- Added Redux Dispatch
import { paperStyle } from '../../style/style';
import TokenInterceptor from '../TokenInterceptor';
import { addFile } from '../../store/FileSlice';

// Upload file to S3 - kept outside component
export const uploadToS3 = async (file: File | null): Promise<boolean> => {
  if (!file) return false;
  try {
    // Request Presigned URL from the server
    const response = await TokenInterceptor.get('https://hiresphereapi.onrender.com/files/upload', {
      params: { fileName: file.name }
    });

    const presignedUrl: URL = response.data as URL;
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(true);
        } else {
          console.error('Upload error:', xhr.statusText);
          reject(false);
        }
      };

      xhr.onerror = () => {
        console.error('Network error while uploading.');
        reject(false);
      };

      xhr.open('PUT', presignedUrl, true);
      xhr.send(file);
    });
  } catch (error) {
    console.error('Error getting Presigned URL:', error);
    return false;
  }
};

const FileUploader = () => {

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // <-- Added Redux Dispatch

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const uploadSuccess = await uploadToS3(file); // <-- Call S3 upload function
    if (uploadSuccess) {
      // Prepare metadata for Redux
      const fileMetadata = {
        fileName: file.name,
        fileType: file.type,
        ownerId: Number(localStorage.getItem('userId')) || 0,
        size: file.size,
      };

      dispatch(addFile(fileMetadata) as any);
      navigate('/tests');
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
