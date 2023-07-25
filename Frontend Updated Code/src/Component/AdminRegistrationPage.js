import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AdminRegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can perform further actions here, like sending the form data to a server
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "560px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "400px",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "16px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Users
        </Typography>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
          required
          type="email"
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
          required
          type="tel"
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "16px" }}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default AdminRegistrationPage;
