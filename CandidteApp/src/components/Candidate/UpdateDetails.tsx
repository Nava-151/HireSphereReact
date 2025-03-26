import { Container, Typography, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { updateUser } from '../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import User from '../../models/User';
import { upload } from '../File/FileUploader';
import { deleteFile } from '../../store/FileSlice';
import { RemoveCircleOutline, Update } from '@mui/icons-material';

function UpdateDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    passwordHash: "",
  });

  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log("in resume change");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResume(file);
      handleResumeRemove();
      upload(resume);
    }
  };

  const handleResumeRemove = () => {
    setResume(null);
    const ownerId = localStorage.getItem("userId"); // Assuming ownerId is stored in localStorage
    if (!ownerId) {
      console.error("Owner ID not found");
      return;
    }

    dispatch(deleteFile({ ownerId: Number(ownerId) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUser(user as User));
      setMessage("Details updated successfully!");

    } catch (error) {
      setMessage("Error updating details. Please try again.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const uploadAlready = useSelector((state: RootState) => state.files.isLoading); // שליפה מה-R


  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center", background: "#002b36", p: 4, borderRadius: 2, color: "#fff" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#00eaff" }}>
        Update Personal Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          label="Full name"
          name="fullname"
          value={user.fullname}
          onChange={handleChange}
          margin="normal"
          sx={{ background: "#fff", borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
          sx={{ background: "#fff", borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          margin="normal"
          sx={{ background: "#fff", borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Password"
          name="passwordHash"
          type="password"
          value={user.passwordHash}
          onChange={handleChange}
          margin="normal"
          sx={{ background: "#fff", borderRadius: 1 }}
        />

        {/* Resume Upload */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            style={{ display: "none" }}
            id="resume-upload"
          />
          <Box>
            <label htmlFor="resume-upload">
              <Update sx={{ mr: 1, background: "linear-gradient(90deg, #00ff99, #00eaff)" }} />
            </label>
            <RemoveCircleOutline sx={{ ml: 1, cursor: "pointer" }} onClick={handleResumeRemove} />
          </Box>


          {uploadAlready || resume && (
            <Typography sx={{ color: "#00ff99" }}>📄 {resume ? resume.name : "no resume uploaded"}</Typography>
          )}
        </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2, background: "linear-gradient(90deg, #00ff99, #00eaff)" }}>
            Update
          </Button>
      </Box>
      {message && <Typography sx={{ mt: 2, color: "#00ff99" }}>{message}</Typography>}
    </Container>
  );
}

export default UpdateDetails;
