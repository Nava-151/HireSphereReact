
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { useState, ChangeEvent, DragEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { uploadToS3, addFile } from "../../store/FileSlice"
import { Box, Button, CheckCircleIcon, Chip, CloudUploadIcon, Paper, styled, Typography, useMediaQuery, useTheme } from "../../MuiImports"

const UploadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  minHeight: "100vh",
  backgroundColor: "#fff",
  color: "#000",
}))

const StyledPaper = styled(Paper)<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  padding: theme.spacing(5),
  border: `2px dashed ${isDragging ? "#03e7a0" : "#ccc"}`,
  borderRadius: 10,
  textAlign: "center",
  width: "100%",
  maxWidth: 600,
  backgroundColor: "#f9f9f9",
  transition: "border 0.3s ease-in-out",
}))

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #03e7a0, #00f2fe)",
  color: "#fff",
  padding: theme.spacing(1.5, 4),
  borderRadius: 15,
  fontWeight: "bold",
  whiteSpace: "nowrap",
  "&:hover": {
    background: "linear-gradient(to right, #00f2fe, #03e7a0)",
  },
}))

const OutlineButton = styled(Button)(({ theme }) => ({
  color: "#03e7a0",
  borderColor: "#03e7a0",
  borderRadius: 30,
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  whiteSpace: "nowrap",
  "&:hover": {
    borderColor: "#0d6efd",
    color: "#0d6efd",
  },
}))

const FileChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#e0f2f1",
  color: "#004d40",
  padding: theme.spacing(1),
  borderRadius: 10,
  fontSize: "0.875rem",
  display: "flex",
  alignItems: "center",
}))

const IconContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dispatch = useDispatch()
  const selector = useSelector((state: RootState) => state.files)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.")
      return
    }

    if (selector.uploadedOnce === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You already uploaded a file!",
      })
      navigate("/tests")
      return
    }

    const resultAction = await dispatch(uploadToS3(file) as any)
    if (uploadToS3.fulfilled.match(resultAction)) {
      const uploadSuccess = resultAction.payload

      if (uploadSuccess) {
        const fileMetadata = {
          fileName: file.name,
          fileType: file.type,
          ownerId: +sessionStorage.getItem("userId")!,
          size: file.size,
        }

        await dispatch(addFile(fileMetadata) as any)
        navigate("/tests")
      }
    } else {
      console.error("S3 Upload Failed:", resultAction.error)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <UploadContainer>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Let's start
      </Typography>
      <Typography variant="body1" mb={1}>
        Step 1 – Upload your resume
      </Typography>
      <Typography variant="body2" mb={3}>
        Supported formats: .pdf or .docx
      </Typography>

      <StyledPaper
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        as={motion.div}
      >
        <IconContainer>
          <CloudUploadIcon sx={{ fontSize: 40, color: "#03e7a0" }} />
        </IconContainer>

        <Typography variant="body1" fontWeight="bold" mb={1}>
          Drag & Drop your file here
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          or
        </Typography>

        <GradientButton as="label">
          Choose file
          <input type="file" hidden onChange={handleFileChange} />
        </GradientButton>

        {file && (
          <FileChip
            icon={<CheckCircleIcon color="success" />}
            label={file.name}
          />
        )}

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          gap={2}
          flexDirection={isMobile ? "column" : "row"}
        >
          <OutlineButton variant="outlined" onClick={handleUpload}>
            Upload
          </OutlineButton>
        </Box>
      </StyledPaper>
    </UploadContainer>
  )
}

export default FileUploader
