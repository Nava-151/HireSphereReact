
import { Modal, Box, TextField, Button, FormHelperText, InputAdornment } from "@mui/material";
import { useState } from "react";
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

const RegisterForm = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    // ✅ Define validation schema
    const schema = object({
        fullName: string().min(4, "Full name must be at least 4 characters").max(50, "Full name is too long").required("Full name is required"),
        email: string().min(10, "Email must be at least 10 characters").email("Invalid email").required("Email is required"),
        passwordHash: string().min(5, "Password must be at least 5 characters").required("Password is required"),
        phone: string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    });

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        console.log("on submit");

        const user: User = {
            fullname: data.fullName,
            email: data.email,
            passwordHash: data.passwordHash,
            phone: data.phone,
            role: UserRole.Candidate,
        };
        dispatch(addUser(user));
            navigate('/upload');

    };

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, width: { xs: '90%', sm: '400px' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField label="Full Name" {...register("fullName")} fullWidth error={!!errors.fullName} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon color="primary" /></InputAdornment>) }} />
                            <FormHelperText error>{errors.fullName?.message}</FormHelperText>

                            <TextField label="Email" {...register("email")} fullWidth error={!!errors.email} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon color="primary" /></InputAdornment>) }} />
                            <FormHelperText error>{errors.email?.message}</FormHelperText>

                            <TextField label="Password" type="password" {...register("passwordHash")} fullWidth error={!!errors.passwordHash} InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon color="primary" /></InputAdornment>) }} />
                            <FormHelperText error>{errors.passwordHash?.message}</FormHelperText>

                            <TextField label="Phone Number" {...register("phone")} fullWidth error={!!errors.phone} InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon color="primary" /></InputAdornment>) }} />
                            <FormHelperText error>{errors.phone?.message}</FormHelperText>

                            <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ background: 'linear-gradient(135deg, #00f2fe, #03e7a0)', color: 'white', '&:hover': { background: 'linear-gradient(135deg, #03e7a0, #00f2fe)' }, padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Register</Button>
                            <p>Do you have an account? </p><button onClick={() => navigate("/login")}>login</button>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RegisterForm;
