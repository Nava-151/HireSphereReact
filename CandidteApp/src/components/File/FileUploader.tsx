
import {
  Button,
  Paper,
  Typography,
  styled,
  Chip,
  Box,
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { useState, ChangeEvent, DragEvent } from "react"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { uploadToS3, addFile } from "../../store/FileSlice"

const UploadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  minHeight: "100vh",
  backgroundColor: "white",
  color: "#fff",
}))

const StyledPaper = styled(Paper)<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  padding: theme.spacing(5),
  border: `2px dashed ${isDragging ? "#03e7a0" : "#888"}`,
  borderRadius: 20,
  textAlign: "center",
  width: "100%",
  maxWidth: 500,
  backgroundColor: "#1e1e1e",
  transition: "border 0.3s ease-in-out",
}))

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #03e7a0,hsl(199, 79.50%, 57.80%))",
  color: "#fff",
  padding: theme.spacing(1.5, 4),
  borderRadius: 30,
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  "&:hover": {
    background: "linear-gradient(to right, #0d6efd, #03e7a0)",
  },
}))

const OutlineButton = styled(Button)(({ theme }) => ({
  color: "#03e7a0",
  borderColor: "#03e7a0",
  borderRadius: 30,
  padding: theme.spacing(1, 3),
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  "&:hover": {
    borderColor: "#0d6efd",
    color: "#0d6efd",
  },
}))

const FileChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#2e2e2e",
  color: "#fff",
  padding: theme.spacing(1),
  borderRadius: 10,
  fontSize: "0.875rem",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}))

const IconContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dispatch = useDispatch()
  const selector = useSelector((state:RootState) => state.files)
  const navigate = useNavigate()

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
        Step number 1 – Upload your resume
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
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

        <OutlineButton variant="outlined" onClick={handleUpload}>
          Upload
        </OutlineButton>
      </StyledPaper>
    </UploadContainer>
  )
}

export default FileUploader
