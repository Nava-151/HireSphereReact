// import { Container, Typography, Box, TextField, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { fetchUserById, updateUser } from "../../store/UserSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import User from "../../models/User";
// import { deleteFile } from "../../store/FileSlice";
// import { RemoveCircleOutline, Update } from "@mui/icons-material";
// import { uploadToS3 } from "../File/FileUploader";

// function UpdateDetails() {
//   const dispatch = useDispatch<AppDispatch>();
//   const userId:number = +(localStorage.getItem("userId")||"0"); // Get user ID from localStorage
//   const userFromStore = useSelector((state: RootState) => state.user.currentUser);
//   const [user, setUser] = useState<User>({
//     fullname: " ",
//     email: "",
//     phone: "",
//     passwordHash: "",
//   });

//   const [message, setMessage] = useState("");
//   const [resume, setResume] = useState<File | null>(null);

//   // Fetch user data when component mounts
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserById(userId));
//     }
//   }, [dispatch, userId]);

//   // Update form fields when user data is loaded
//   useEffect(() => {
//     if (userFromStore) {
//       setUser({
//         fullname: userFromStore.fullname || "",
//         email: userFromStore.email || "",
//         phone: userFromStore.phone || "",
//         passwordHash: "", // Keep password field empty for security reasons
//       });
//     }
//   }, [userFromStore]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setResume(file);
//       handleResumeRemove();
//       uploadToS3(resume);
//     }
//   };

//   const handleResumeRemove = () => {
//     setResume(null);
//     if (!userId) {
//       console.error("Owner ID not found");
//       return;
//     }
//     dispatch(deleteFile({ ownerId: Number(userId) }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUser(user as User));
//       setMessage("Details updated successfully!");
//     } catch (error) {
//       setMessage("Error updating details. Please try again.");
//     } finally {
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   const uploadAlready = useSelector((state: RootState) => state.files.isLoading);

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 5,
//         textAlign: "center",
//         background: "#002b36",
//         p: 4,
//         borderRadius: 2,
//         color: "#fff",
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ color: "#00eaff" }}>
//         Update Personal Details
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         <TextField
//           fullWidth
//           label="Full name"
//           name="fullname"
//           value={user.fullname}
//           onChange={handleChange}
//           margin="normal"
//           sx={{ background: "#fff", borderRadius: 1 }}
//         />
//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={user.email}
//           onChange={handleChange}
//           margin="normal"
//           sx={{ background: "#fff", borderRadius: 1 }}
//         />
//         <TextField
//           fullWidth
//           label="Phone"
//           name="phone"
//           value={user.phone}
//           onChange={handleChange}
//           margin="normal"
//           sx={{ background: "#fff", borderRadius: 1 }}
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           name="passwordHash"
//           type="password"
//           value={user.passwordHash}
//           onChange={handleChange}
//           margin="normal"
//           sx={{ background: "#fff", borderRadius: 1 }}
//           placeholder="Enter a new password (optional)"
//         />

//         {/* Resume Upload */}
//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} style={{ display: "none" }} id="resume-upload" />
//           <Box>
//             <label htmlFor="resume-upload">
//               <Update sx={{ mr: 1 }} />
//             </label>
//             <RemoveCircleOutline sx={{ ml: 1, cursor: "pointer" }} onClick={handleResumeRemove} />
//           </Box>

//           {uploadAlready || resume && (
//             <Typography sx={{ color: "#00ff99" }}>📄 {resume ? resume.name : "No resume uploaded"}</Typography>
//           )}
//         </Box>
//         <Button type="submit" variant="contained" sx={{ mt: 2, background: "linear-gradient(90deg, #00ff99, #00eaff)" }}>
//           Update
//         </Button>
//       </Box>
//       {message && <Typography sx={{ mt: 2, color: "#00ff99" }}>{message}</Typography>}
//     </Container>
//   );
// }

// export default UpdateDetails;
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import User from "../../models/User";
import { deleteFile } from "../../store/FileSlice";
import { RemoveCircleOutline, Update } from "@mui/icons-material";
import { uploadToS3 } from "../File/FileUploader";

function UpdateDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const userId:number = +(localStorage.getItem("userId")||"0"); 
  const userFromStore = useSelector((state: RootState) => state.user.currentUser);
  const [user, setUser] = useState<User>({
    fullname: " ",
    email: "",
    phone: "",
    passwordHash: "",
  });

  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; passwordHash?: string }>({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userFromStore) {
      setUser({
        fullname: userFromStore.fullname || "",
        email: userFromStore.email || "",
        phone: userFromStore.phone || "",
        passwordHash: "",
      });
    }
  }, [userFromStore]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{9,15}$/.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length === 0 || password.length >= 4;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "email") {
      setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) ? "" : "Invalid email format" }));
    }
    if (name === "phone") {
      setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(value) ? "" : "Phone number must be 9-15 digits" }));
    }
    if (name === "passwordHash") {
      setErrors((prevErrors) => ({ ...prevErrors, passwordHash: validatePassword(value) ? "" : "Password must be at least 4 characters" }));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResume(file);
      handleResumeRemove();
      uploadToS3(resume);
    }
  };

  const handleResumeRemove = () => {
    setResume(null);
    if (!userId) {
      console.error("Owner ID not found");
      return;
    }
    dispatch(deleteFile({ ownerId: Number(userId) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.email || errors.phone || errors.passwordHash) {
      setMessage("Please fix errors before submitting.");
      return;
    }
    try {
      dispatch(updateUser(user as User));
      setMessage("Details updated successfully!");
    } catch (error) {
      setMessage("Error updating details. Please try again.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const uploadAlready = useSelector((state: RootState) => state.files.isLoading);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center", background: "#002b36", p: 4, borderRadius: 2, color: "#fff" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#00eaff" }}>
        Update Personal Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField fullWidth label="Full name" name="fullname" value={user.fullname} onChange={handleChange} margin="normal" sx={{ background: "#fff", borderRadius: 1 }} />
        <TextField fullWidth label="Email" name="email" type="email" value={user.email} onChange={handleChange} margin="normal" sx={{ background: "#fff", borderRadius: 1 }} error={!!errors.email} helperText={errors.email} />
        <TextField fullWidth label="Phone" name="phone" value={user.phone} onChange={handleChange} margin="normal" sx={{ background: "#fff", borderRadius: 1 }} error={!!errors.phone} helperText={errors.phone} />
        <TextField fullWidth label="Password" name="passwordHash" type="password" value={user.passwordHash} onChange={handleChange} margin="normal" sx={{ background: "#fff", borderRadius: 1 }} placeholder="Enter a new password (optional)" error={!!errors.passwordHash} helperText={errors.passwordHash} />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} style={{ display: "none" }} id="resume-upload" />
          <Box>
            <label htmlFor="resume-upload">
              <Update sx={{ mr: 1 }} />
            </label>
            <RemoveCircleOutline sx={{ ml: 1, cursor: "pointer" }} onClick={handleResumeRemove} />
          </Box>
          {uploadAlready || resume && <Typography sx={{ color: "#00ff99" }}>📄 {resume ? resume.name : "No resume uploaded"}</Typography>}
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2, background: "linear-gradient(90deg, #00ff99, #00eaff)" }}>Update</Button>
      </Box>
      {message && <Typography sx={{ mt: 2, color: "#00ff99" }}>{message}</Typography>}
    </Container>
  );
}

export default UpdateDetails;
