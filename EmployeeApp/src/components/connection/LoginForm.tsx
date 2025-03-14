// import { Modal, Box, TextField, Button } from "@mui/material"
// import { useState } from "react";
// import { colorStyle, modalStyle } from "../style/style";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { object, string } from "yup";
// import {  login } from "../store/UserSlice";
// import { useDispatch } from "react-redux";
// import { UserDispatch } from "../store/store";
// import LoginIcon from '@mui/icons-material/Login';
// import { UserLogin } from "../models/User";

// const LoginForm = () => {
//     const [open, setOpen] = useState(true);
//     const dispatch = useDispatch<UserDispatch>()
//     const schema = object().shape(({
//         email: string().min(10).required().email("Invalid email"),
//         passwordHash: string().min(5).required(),
//     }))

//     const {
//         formState: { errors },
//         register,
//         handleSubmit,
//     } = useForm({ resolver: yupResolver(schema) })
//     const onSubmit = async (data: any) => {
//         console.log("on submit");
//         const userLogin: UserLogin = {
//             email: data.email,
//             passwordHash: data.passwordHash
            
//         }
        
//         dispatch(login(userLogin))
//     }


//     return (
//         <>
//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         ...modalStyle,
//                         bgcolor: 'background.paper',
//                         borderRadius: 2,
//                         boxShadow: 24,
//                         p: 4,
//                         width: '400px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 2,
//                     }}
//                 >
//                     <form onSubmit={handleSubmit(onSubmit)}>
                     
//                         <TextField
//                             label="Email"
//                             type="email"
//                             {...register("email")}
//                             fullWidth
//                         />
//                         {/* {errors.description && <Errors message={errors.description.message || " "} />} */}
//                         <TextField
//                             label="Password"
//                             type="password"
//                             {...register("passwordHash")}
//                             fullWidth
//                         />
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             startIcon={<LoginIcon  />}
//                             sx={colorStyle}
//                         >

//                         </Button>
//                     </form>
//                 </Box>
//             </Modal>
//         </>
//     )
// }
// export default LoginForm
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

const LoginForm = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<UserDispatch>();

    // ✅ Define validation schema
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
                onClose={() => setOpen(false)}
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
