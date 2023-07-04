import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../styles/style.css";
import * as actionType from "../redux-saga/actions";
import { connect } from "react-redux";

function UserRegistration(props) {
  const { actions, regLoading, regSuccess, regErr, message, jwtToken } = props;
  const [openMsg, setOpenMsg] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      age: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.phone) {
        errors.mobileNumber = "MobileNumber is a required field";
      }
      if (!values.email) {
        errors.email = "Email is a required field";
      }

      if (!values.password) {
        errors.password = "Password is a required field";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form value sfr", values);
      values.roles = ["user"];
      actions.registerUser({ userData: values });
      actions.testMsg("Hello, This is from Test message");
    },
  });

  const handleClose = () => {
    setOpenMsg(false);
    actions.resetUserMsg();
    navigate("/login");
  };
  useEffect(() => {
    console.log("success registration", regSuccess);
    console.log("Send Messgae is", message);
    if (regSuccess != null) {
      setOpenMsg(true);
    }
    
  });

  return (
    <Box
      sx={{ height: "700px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          border: "1px solid #ccc",
          position: "absolute",
          padding: "18px",
          width: "400px",
          borderRadius: "4px",
          marginTop: "16px",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" align="center" color="#7E1717">
            Registration
          </Typography>
          <Stack direction="row" alignItems="center">
            <TextField
              variant="outlined"
              label="Enter First Name"
              value={formik.values.firstname}
              name="firstname"
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <Typography color="error">
              {formik.errors.firstName ? formik.errors.firstName : null}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <TextField
              variant="outlined"
              label="Enter Last Name"
              value={formik.values.lastname}
              name="lastname"
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <Typography color="error">
              {formik.errors.lastName ? formik.errors.lastName : null}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <TextField
              variant="outlined"
              label="Enter Mobile Number"
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <Typography color="error">
              {formik.errors.mobileNumber ? formik.errors.mobileNumber : null}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <TextField
              variant="outlined"
              label="Enter Email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              fullWidth
              required
            />
            <Typography color="error">
              {formik.errors.email ? formik.errors.email : null}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <TextField
              variant="outlined"
              label="Enter Age"
              value={formik.values.age}
              name="age"
              onChange={formik.handleChange}
              fullWidth
            />
            <Typography color="error">
              {formik.errors.age ? formik.errors.age : null}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <TextField
              type="password"
              variant="outlined"
              label="Enter Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              required
              fullWidth
            />
            <Typography color="error">
              {formik.errors.password ? formik.errors.password : null}
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "16px", backgroundColor: "#E55807" }}
        >
          Register
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMsg}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You are successfully registered!
        </Alert>
      </Snackbar>
    </Box>
  );
}

const mapStateToProps = ({ reducerUser, policyReducer }) => {
  return {
    regLoading: reducerUser.regLoading,
    regSuccess: reducerUser.regSuccess,
    regErr: reducerUser.regErr,
    message: policyReducer.message,
    jwtToken: reducerUser.jwtToken,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    registerUser: (payload) => {
      dispatch(actionType.registerUser(payload));
    },
    testMsg: (payload) => {
      dispatch(actionType.sendMessage(payload));
    },
    resetUserMsg: () => {
      dispatch(actionType.resetUserMsg());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
