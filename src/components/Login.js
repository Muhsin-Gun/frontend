import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "./Auth"; // Your Auth provider
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password, () => {
      navigate("/dashboard"); // redirect on success
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, backgroundColor: "peachpuff" }}
      >
        <Box textAlign="center" mb={3}>
          <LoginIcon sx={{ fontSize: 40, color: "peru" }} />
          <Typography variant="h5" fontWeight="bold">
            User Login
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
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
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              backgroundColor: "peru",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#a0522d",
                transform: "scale(1.02)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body1">
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "peru",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </a>
          </Typography>
        </Box>

        <Box textAlign="center" mt={1}>
          <Typography variant="body2">
            <a
              href="/forgot-password"
              style={{
                color: "peru",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

