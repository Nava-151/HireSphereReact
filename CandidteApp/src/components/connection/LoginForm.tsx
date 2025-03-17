
import { Modal, Box, TextField, Button, FormHelperText } from "@mui/material";
import { useState } from "react";
import { colorStyle, modalStyle } from "../../style/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { login } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { UserDispatch } from "../../store/store";
import LoginIcon from '@mui/icons-material/Login';
import { UserLogin } from "../../models/User";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<UserDispatch>();
    const navigate = useNavigate();
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
        console.log("on submit");
        const userLogin: UserLogin = {
            email: data.email,
            passwordHash: data.passwordHash,
        };
        dispatch(login(userLogin));
    };

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
                    sx={{
                        ...modalStyle,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <TextField
                            label="Email"
                            type="email"
                            {...register("email")}
                            fullWidth
                            error={!!errors.email}
                        />
                        <FormHelperText error>{errors.email?.message}</FormHelperText>

                        {/* Password */}
                        <TextField
                            label="Password"
                            type="password"
                            {...register("passwordHash")}
                            fullWidth
                            error={!!errors.passwordHash}
                        />
                        <FormHelperText error>{errors.passwordHash?.message}</FormHelperText>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<LoginIcon />}
                            sx={colorStyle}
                        >
                            Login
                        </Button>

                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default LoginForm;
