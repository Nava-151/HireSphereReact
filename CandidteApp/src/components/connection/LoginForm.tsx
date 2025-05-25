
import { useState, useRef } from "react"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { login } from "../../store/UserSlice"
import { useNavigate } from "react-router-dom"
import { UserLogin } from "../../models/User"
import { buttonStyle } from "../../style/style"
import Spinner from "../CompInAllPages/Spinner"
import { Box, Button, CloseIcon, Divider, EmailIcon, FormHelperText, IconButton, InputAdornment, LockIcon, LoginIcon, Modal, Paper, styled, TextField, Typography, VisibilityIcon, VisibilityOffIcon } from "../../MuiImports"

const LoginPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  borderRadius: 16,
  padding: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(45deg, #00f2fe, #03e7a0)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at top right, rgba(0, 242, 254, 0.05), transparent 70%)",
    pointerEvents: "none",
  },
}))

const CloseButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 8,
  right: 8,
  color: "#888",
  "&:hover": {
    color: "#333",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}))

const schema = yup.object({
  email: yup.string().min(10, "Email must be at least 10 characters").email("Invalid email").required("Email is required"),
  passwordHash: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
})

const LoginForm = () => {
  const [open, setOpen] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const isLoading = useSelector((state: any) => state.user.loading)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: any) => {
    const userLogin: UserLogin = {
      email: data.email,
      passwordHash: data.passwordHash,
      role: 0,
    }
    const response = await dispatch(login(userLogin))
    if (response.type.includes("fulfilled")) navigate("/upload")
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpen(false)
      navigate("/")
    }
  }

  if (isLoading) return <Spinner />
  if (!open) return null

  return (
    <Modal open={open} onClose={() => { setOpen(false); navigate("/") }}>
      <Box
        sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={handleClose}
      >
        <Box
          ref={modalRef}
          sx={{ width: { xs: "90%", sm: 400 }, outline: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          <LoginPaper>
            <CloseButton onClick={() => { setOpen(false); navigate("/") }}>
              <CloseIcon />
            </CloseButton>

            <Typography
              variant="h4"
              component="h2"
              align="center"
              className="gradient-text"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Welcome Back
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                sx={{ mb: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#00f2fe" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register("passwordHash")}
                error={!!errors.passwordHash}
                sx={{ mb: 1, mt: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#00f2fe" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon sx={{ color: "#888" }} />
                        ) : (
                          <VisibilityIcon sx={{ color: "#888" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>{errors.passwordHash?.message}</FormHelperText>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
               <Button type="submit" variant="contained" fullWidth startIcon={<LoginIcon />} sx={buttonStyle}>
                Login
              </Button>
              </Box>

              

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                  Don't have an account?
                </Typography>
                <Button variant="outlined" fullWidth className="outline-button" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </Box>
            </form>
          </LoginPaper>
        </Box>
      </Box>
    </Modal>
  )
}

export default LoginForm
