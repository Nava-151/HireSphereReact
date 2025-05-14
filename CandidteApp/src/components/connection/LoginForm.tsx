import { Modal, Box, TextField, Button, FormHelperText, InputAdornment } from "@mui/material";
import { useState, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { login } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { UserLogin } from "../../models/User";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { formBox } from "../../style/style";
import Spinner from "../Spinner";


const LoginForm = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const modalRef = useRef<HTMLDivElement>(null); 
    const isLoading = useSelector((state: any) => state.user.loading);
  
    
    const schema = object({
        email: string().min(10, "Email must be at least 10 characters").email("Invalid email").required("Email is required"),
        passwordHash: string().min(5, "Password must be at least 5 characters").required("Password is required"),
    });

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        const userLogin: UserLogin = {
            email: data.email,
            passwordHash: data.passwordHash,
            role: 0
        };
        const response = await dispatch(login(userLogin));
        if (response.type.includes("fulfilled"))
            navigate('/upload');
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setOpen(false);
            navigate("/");
        }
    };
    if (isLoading) return <Spinner />;
    if (!open) return null; // Don't render if closed
    
    return (
        <>
        
        <Modal
            open={open}
            onClose={() => { setOpen(false); navigate('/') }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box 
                sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={handleClose} // Listen for clicks on the backdrop
            >
                <Box 
                    ref={modalRef} // Reference the inner box
                    sx={formBox}
                    onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Email"
                            type="email"
                            {...register("email")}
                            fullWidth
                            error={!!errors.email}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText error>{errors.email?.message}</FormHelperText>

                        <TextField
                            label="Password"
                            type="password"
                            {...register("passwordHash")}
                            fullWidth
                            error={!!errors.passwordHash}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText error>{errors.passwordHash?.message}</FormHelperText>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<LoginIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #00f2fe, #03e7a0)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #03e7a0, #00f2fe)'
                                },
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                mt: 2
                            }}
                        >
                            Login
                        </Button>

                        <p>Don't have an account?</p> 
                        <Button onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
        </>
    );
};

export default LoginForm;
