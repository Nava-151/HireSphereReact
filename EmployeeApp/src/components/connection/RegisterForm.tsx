// import { Modal, Box, TextField, Button } from "@mui/material"
// import { useState } from "react";
// import { colorStyle, modalStyle } from "../style/style";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { object, string } from "yup";
// import AddIcon from '@mui/icons-material/Add';
// import User, { UserRole } from "../models/User";
// import { addUser } from "../store/UserSlice";
// import { useDispatch } from "react-redux";
// import { UserDispatch } from "../store/store";

// const RegisterForm = () => {
//     const [open, setOpen] = useState(true);
//     const dispatch = useDispatch<UserDispatch>()
//     const schema = object().shape(({
//         fullName: string().min(4).max(50).required(),
//         email: string().min(10).required().email("Invalid email"),
//         passwordHash: string().min(5).required(),
//         phone: string().required()

//     }))

//     const {
//         formState: { errors },
//         register,
//         handleSubmit,
//     } = useForm({ resolver: yupResolver(schema) })
//     const onSubmit = async (data: any) => {
//         console.log("on submit");
        
//         const user: User = {
//             fullname: data.fullName,
//             email: data.email,
//             passwordHash: data.passwordHash,
//             phone: data.phone,
//             role:UserRole.Candidate
//         }
//         dispatch(addUser(user))       
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
//                             label="FullName"
//                             type="text"
//                             {...register("fullName")}
//                             fullWidth
//                         />
//                         {/* {errors.fullName />} */}

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
//                         /><TextField
//                             label="Phone number"
//                             type="number"
//                             {...register("phone")}
//                             fullWidth
//                         />

//                         <Button
//                             type="submit"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             sx={colorStyle}
//                         >

//                         </Button>
//                     </form>
//                 </Box>
//             </Modal>
//         </>
//     )
// }
// export default RegisterForm
import { Modal, Box, TextField, Button, FormHelperText } from "@mui/material";
import { useState } from "react";
import { colorStyle, modalStyle } from "../../style/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import AddIcon from '@mui/icons-material/Add';
import User, { UserRole } from "../../models/User";
import { addUser } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { UserDispatch } from "../../store/store";

const RegisterForm = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<UserDispatch>();

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
                        {/* Full Name */}
                        <TextField
                            label="Full Name"
                            type="text"
                            {...register("fullName")}
                            fullWidth
                            error={!!errors.fullName}
                        />
                        <FormHelperText error>{errors.fullName?.message}</FormHelperText>

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

                        {/* Phone Number */}
                        <TextField
                            label="Phone Number"
                            type="text"
                            {...register("phone")}
                            fullWidth
                            error={!!errors.phone}
                        />
                        <FormHelperText error>{errors.phone?.message}</FormHelperText>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={colorStyle}
                        >
                            Register
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default RegisterForm;
