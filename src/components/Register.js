import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:4000/api/register", formData);
      setSuccessMessage("Registration successful!");
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.error?.message || "Registration failed."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: "peachpuff" }}>
        <Box textAlign="center" mb={3}>
          <PersonAddAltIcon sx={{ fontSize: 40, color: "peru" }} />
          <Typography variant="h5" fontWeight="bold">
            Register New Account
          </Typography>
        </Box>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "peru",
              color: "white",
              "&:hover": {
                backgroundColor: "#a0522d",
                transform: "scale(1.02)",
              },
            }}
          >
            Register
          </Button>
          <Box textAlign="center" mt={3}>
       <Typography variant="body1">
         Already a user?{" "}
        <Link to="/login" style={{ color: "peru", fontWeight: "bold", textDecoration: "none" }}>
      Login
      </Link>
   </Typography>
</Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
