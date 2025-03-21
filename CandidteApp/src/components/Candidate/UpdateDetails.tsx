import { Container, Typography, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import { updateUser } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import User from '../../models/User';

function UpdateDetails() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState({
      fullname: "deafult",
      email: "",
      phone: "",
      passwordHash: ""
    });
    const [message, setMessage] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
          <Button type="submit" variant="contained" sx={{ mt: 2, background: "linear-gradient(90deg, #00ff99, #00eaff)" }}>
            Update
          </Button>
        </Box>
        {message && <Typography sx={{ mt: 2, color: "#00ff99" }}>{message}</Typography>}
      </Container>
    );


}

export default UpdateDetails