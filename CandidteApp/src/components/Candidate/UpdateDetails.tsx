import { Container, Typography, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import User from "../../models/User";
import { deleteFile, fetchPresignedUrl, uploadToS3 } from "../../store/FileSlice";
import { RemoveCircleOutline, Update } from "@mui/icons-material";

function UpdateDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = Number(sessionStorage.getItem("userId"));
  const userFromStore = useSelector((state: RootState) => state.user.currentUser);
  const presignedUrl = useSelector((state: RootState) => state.files.presignedUrl);
  const isLoading = useSelector((state: RootState) => state.files.isLoading);

  const [user, setUser] = useState<User>({
    fullName: "",
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
        fullName: userFromStore.fullName || "",
        email: userFromStore.email || "",
        phone: userFromStore.phone || "",
        passwordHash: "",
      });
    }
  }, [userFromStore]);

  useEffect(() => {
    if (presignedUrl) {
      window.open(presignedUrl, "_blank");
    }
  }, [presignedUrl]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{9,15}$/.test(phone);
  const validatePassword = (password: string) => password.length === 0 || password.length >= 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: name === "email" ? (validateEmail(value) ? "" : "Invalid email format") : prevErrors.email,
      phone: name === "phone" ? (validatePhone(value) ? "" : "Phone must be 9-15 digits") : prevErrors.phone,
      passwordHash:
        name === "passwordHash" ? (validatePassword(value) ? "" : "Password must be at least 4 characters") : prevErrors.passwordHash,
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResume(file);

      dispatch(deleteFile({ ownerId: userId }));

      dispatch(uploadToS3(file) as any);
    }
  };

  const handleResumeRemove = () => {
    setResume(null);
    dispatch(deleteFile({ ownerId: userId }));
  };

  const handleDownload = () => {
    dispatch(fetchPresignedUrl(userId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.email || errors.phone || errors.passwordHash) {
      setMessage("Please fix errors before submitting.");
      return;
    }

    dispatch(updateUser(user))
      .then(() => setMessage("Details updated successfully!"))
      .catch(() => setMessage("Error updating details."))
      .finally(() => {
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" mb={3}>Update Your Details</Typography>

        <TextField fullWidth label="Full Name" name="fullName" value={user.fullName} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Email" name="email" value={user.email} onChange={handleChange} margin="normal" error={!!errors.email} helperText={errors.email} />
        <TextField fullWidth label="Phone" name="phone" value={user.phone} onChange={handleChange} margin="normal" error={!!errors.phone} helperText={errors.phone} />
        <TextField fullWidth label="New Password" name="passwordHash" value={user.passwordHash} onChange={handleChange} margin="normal" type="password" error={!!errors.passwordHash} helperText={errors.passwordHash} />

        <Box mt={2}>
          <Button variant="outlined" component="label">
            Upload Resume
            <input type="file" hidden onChange={handleResumeChange} />
          </Button>

          {resume && (
            <Button color="error" startIcon={<RemoveCircleOutline />} onClick={handleResumeRemove} sx={{ ml: 2 }}>
              Remove Resume
            </Button>
          )}
        </Box>

        <Box mt={2}>
          <Button variant="contained" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? "Loading..." : "Download Resume"}
          </Button>
        </Box>

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" startIcon={<Update />}>
            Save Changes
          </Button>
        </Box>

        {message && (
          <Typography color="secondary" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default UpdateDetails;
