
import React, { useState } from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography, Button, Paper, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paperStyle, upload } from '../../style/style';
import { addFile, uploadToS3 } from '../../store/FileSlice';
import { RootState } from '../../store/store';
import Swal from 'sweetalert2';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.files);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm")); // מסכים קטנים

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

    if (selector.uploadedOnce === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you uploaded file already!",
      });
      navigate('/tests');
      return;
    }

    const resultAction = await dispatch(uploadToS3(file) as any);

    if (uploadToS3.fulfilled.match(resultAction)) {
      const uploadSuccess = resultAction.payload;

      if (uploadSuccess) {
        const fileMetadata = {
          fileName: file.name,
          fileType: file.type,
          ownerId: +sessionStorage.getItem('userId')!,
          size: file.size,
        };

        await dispatch(addFile(fileMetadata) as any);
        navigate('/tests');
      }
    } else {
      console.error("S3 Upload Failed:", resultAction.error);
    }
  };

  return (

    
    <Box
      sx={{
        ...upload,
        px: isSmall ? 2 : 6,
        py: 4,
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#333", textAlign: "center" }}>
        Let's start
      </Typography>

      <Typography variant="body1" sx={{ mb: 1, color: "#666", textAlign: "center" }}>
        Step number 1
      </Typography>

      <Typography variant="body1" sx={{ mb: 1, color: "#666", textAlign: "center" }}>
        Upload your resume
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, color: "#999", textAlign: "center" }}>
        Only .pdf or .docx extensions
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={isSmall ? 350 : 500}
      >
        <Paper
          component={motion.div}
          whileHover={{ scale: 1.03 }}
          elevation={6}
          sx={{
            ...paperStyle,
            width: "100%",
            p: 4,
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <CloudUploadIcon sx={{ color: "#03A9F4", fontSize: 50 }} />

          <Typography variant="body1" sx={{ color: "#4CAF50", mt: 1, fontWeight: "bold" }}>
            Click to upload
          </Typography>

          <input type="file" hidden onChange={handleFileChange} id="file-upload" />

          <Button
            component="label"
            htmlFor="file-upload"
            fullWidth={isSmall}
            sx={{
              mt: 2,
              bgcolor: "#4CAF50",
              color: "#fff",
              '&:hover': { bgcolor: "#388E3C" }
            }}
          >
            Select file
          </Button>

          <Button
            onClick={handleUpload}
            fullWidth={isSmall}
            sx={{ color: "#4CAF50", mt: 1, fontWeight: "bold" }}
          >
            Upload
          </Button>

          {file && (
            <Typography variant="body2" sx={{ color: "#555", mt: 2, wordBreak: "break-word" }}>
              {file.name}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default FileUploader;
