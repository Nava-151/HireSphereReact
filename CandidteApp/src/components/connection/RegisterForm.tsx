import { Modal, Box, TextField, Button, FormHelperText, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import User, { UserRole } from "../../models/User";
import { addUser } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { buttonStyle } from "../../style/style";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        setOpen(false);
        // נווט חזרה לדף הבית או לדף אחר כדי לסגור באמת
        navigate("/");
    };

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
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        const user: User = {
            fullname: data.fullName,
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

    if (!open) {
        return null; // אל תציג כלום אם המודל סגור
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100vh', 
                    px: 2 
                }}
            >
                <Box 
                    sx={{ 
                        bgcolor: 'background.paper', 
                        borderRadius: 3, 
                        boxShadow: 6, 
                        p: { xs: 3, sm: 4 }, 
                        width: { xs: '100%', sm: '400px' }, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2 
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField 
                            label="Full Name" 
                            {...register("fullName")} 
                            fullWidth 
                            error={!!errors.fullName} 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <FormHelperText error>{errors.fullName?.message}</FormHelperText>

                        <TextField 
                            label="Email" 
                            {...register("email")} 
                            fullWidth 
                            error={!!errors.email} 
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                )
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
                                        <PhoneIcon color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <FormHelperText error>{errors.phone?.message}</FormHelperText>

                        <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ ...buttonStyle, mt: 2 }}>
                            Register
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <p style={{ marginBottom: 8 }}>Already have an account?</p>
                            <Button onClick={() => navigate("/login")} variant="outlined" fullWidth>
                                Login
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

export default RegisterForm;
