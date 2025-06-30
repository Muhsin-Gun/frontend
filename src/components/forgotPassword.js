import React, { useState } from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("http://localhost:4000/api/forgot-password", { email });
      setMessage(response.data.message || "Check your email for a reset link.");
      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, backgroundColor: "peachpuff" }}
      >
        <Box textAlign="center" mb={3}>
          <EmailIcon sx={{ fontSize: 40, color: "peru" }} />
          <Typography variant="h5" fontWeight="bold">
            Forgot Password
          </Typography>
        </Box>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              "Send Reset Link"
            )}
          </Button>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{
                color: "peru",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Back to Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
