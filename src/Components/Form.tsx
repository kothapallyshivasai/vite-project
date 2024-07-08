import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { containerStyles, cardStyles, typographyStyles, buttonStyles } from './css/form-styles';

const FormPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  useEffect(() => {
    if (message) {
      setError(message);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("Please fill in all fields.");
      return;
    }
    localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));
    navigate("/home");
  };

  return (
    <Container>
      <Box sx={containerStyles}>
        <Card sx={cardStyles}>
          <CardContent>
            <Typography variant="h4" sx={typographyStyles} component="h4">
              User Information Form
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={buttonStyles}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FormPage;
