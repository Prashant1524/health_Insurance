import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { actions, userData, loginSucc, loginErr, loginLoading, jwtToken } =
    props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openMsg, setOpenMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: username,
      password: password,
    };
    console.log("Login Data is", data);
    actions.loginUser({ data });
  };

  const handleClose = () => {
    setOpenMsg(false);
    actions.resetUserMsg();
  };
  useEffect(() => {
    console.log("Login Success", loginSucc);
    if (jwtToken) {
      localStorage.setItem("token", jwtToken);
      navigate("/policies");
    }
    console.log("Login Error is", loginErr);
    if (loginErr) {
      setOpenMsg(true);
      setErrMsg("Incorrect Username or Password.");
    }
  }, [jwtToken, loginErr]);

  return (
    <Box
      sx={{
        minHeight: "490px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          marginTop: "16px",
          border: "1px solid #ccc",
          position: "absolute",
          width: "400px",
          padding: "18px",
        }}
      >
        <Stack spacing={3} alignContent="center">
          <Typography variant="h4" align="center" color="#7E1717">
            Login
          </Typography>
          <TextField
            variant="outlined"
            name="username"
            value={username}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            variant="outlined"
            name="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <Typography color="error">{errMsg}</Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "60px",
              marginLeft: "30px",
              backgroundColor: "#E55807",
              justifyContent: "center",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Stack>
        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openMsg}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect Username or Password.
          </Alert>
        </Snackbar> */}
      </Box>
    </Box>
  );
}

const mapStateToProps = ({ reducerUser }) => {
  return {
    loginLoading: reducerUser.loginLoading,
    loginSucc: reducerUser.loginSucc,
    loginErr: reducerUser.loginErr,
    jwtToken: reducerUser.jwtToken,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loginUser: (payload) => {
      dispatch(actionType.login(payload));
    },
    resetUserMsg: () => {
      dispatch(actionType.resetUserMsg());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
