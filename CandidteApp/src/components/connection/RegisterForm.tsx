

import { useEffect,  useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"
import User, { UserRole } from "../../models/User"
import { AppDispatch } from "../../store/store"
import { addUser } from "../../store/UserSlice"
import { buttonStyle } from "../../style/style"
import { AddIcon, Box, Button, CloseIcon, Divider, EmailIcon, FormHelperText, IconButton, InputAdornment, LockIcon, Modal, Paper, PersonIcon, PhoneIcon, styled, TextField, Typography, VisibilityIcon, VisibilityOffIcon } from "../../MuiImports"
import Spinner from "../CompInAllPages/Spinner"

const RegisterPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: "400px",
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
        background: "radial-gradient(circle at bottom left, rgba(3, 231, 160, 0.05), transparent 70%)",
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



const RegisterForm = () => {


    const [formData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
    })
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);


    if (isLoading) return <Spinner />;
   

    useEffect(() => {
        if (open) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [open]);

    const schema = object({
        fullName: string().min(4, "Full name must be at least 4 characters").max(50, "Full name is too long").required("Full name is required"),
        email: string().min(9, "Email must be at least 9 characters").email("Invalid email").required("Email is required"),
        passwordHash: string().min(5, "Password must be at least 5 characters").required("Password is required"),
        phone: string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    });

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: formData.fullName,
            email: formData.email,
            passwordHash: formData.password,
            phone: formData.phone,
        },
    });

    const onSubmit = async (data: any) => {
        const user: User = {
            fullName: data.fullName,
            email: data.email,
            passwordHash: data.passwordHash,
            phone: data.phone,
            role: UserRole.Candidate,
        };
        const resultAasync = await dispatch(addUser(user));
        if (resultAasync.type.includes("fulfilled")) {
            navigate('/upload');
        }
    };
    const handleClose = () => {
        setOpen(false);
        console.log("close modal");
        navigate("/");
    };


    const [showPassword, setShowPassword] = useState(false)

    return (
        <Modal
            open={open}
            onClose={()=>{handleClose}}
            aria-labelledby="register-modal-title"
            aria-describedby="register-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "400px" },
                    maxWidth: "100%",
                    outline: "none",
                    
                }}
            >
                <RegisterPaper>
                    <CloseButton onClick={() => {setOpen(false); navigate("/")}}>
                        <CloseIcon />
                    </CloseButton>

                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        className="gradient-text"
                        sx={{ fontWeight: 700, mb: 3 }}
                    >
                        Create Account
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <TextField
                            label="Full Name"
                            {...register("fullName")}
                            fullWidth
                            error={!!errors.fullName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "#00f2fe" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormHelperText error>{errors.fullName?.message}</FormHelperText>

                        <TextField
                            label="Email"
                            {...register("email")}
                            type="email"
                            fullWidth
                            error={!!errors.email}
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
                            {...register("passwordHash")}
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            error={!!errors.passwordHash}
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

                        <TextField
                            label="Phone Number"
                            {...register("phone")}
                            fullWidth
                            error={!!errors.phone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon sx={{ color: "#00f2fe" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormHelperText error>{errors.phone?.message}</FormHelperText>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={buttonStyle}
                            className="gradient-button"
                        >
                            Register
                        </Button>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                                Already have an account?
                            </Typography>
                            <Button onClick={() => navigate("/login")} variant="outlined" fullWidth className="outline-button">
                                Login
                            </Button>
                        </Box>
                    </form>
                </RegisterPaper>
            </Box>
        </Modal>
    )
}

export default RegisterForm
