import React from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import * as actionType from "../redux-saga/actions";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import captchaImg from "../images/captchaImg.jpg";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";

const AdminLogin = (props) => {
  const { actions, userData, loginSucc, loginErr, loginLoading, jwtToken } =
    props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openMsg, setOpenMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [userCaptcha, setUserCaptcha] = useState(null);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaErr, setCaptchaErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const el = document.getElementById("myForm");
    if (el) {
      el.addEventListener("submit", function (evt) {
        evt.preventDefault();
        const data = {
          email: username,
          password: password,
        };
        // if (!userCaptcha) {
        //   setCaptchaErr("Enter Captcha.");
        if (userCaptcha && userCaptcha.split("").join(" ") !== captchaText) {
          setCaptchaErr("Captcha is incorrect.");
          refreshCaptcha();
        } else {
          console.log("Login Data is", data);
          actions.loginAdmin({ data });
        }
      });
    }
  };

  useEffect(() => {
    console.log("Login Success", loginSucc);
    if (jwtToken) {
      localStorage.setItem("token", jwtToken.jwtToken);
      const user = jwt(jwtToken.jwtToken);
      console.log("Decoded jwt Token is", user);
      setEmail(user.sub);
      actions.getUserDetails({ email: user.sub });
      // navigate("/");
    }
    console.log("Login Error is", loginErr);
    if (loginErr) {
      setOpenMsg(true);
      refreshCaptcha();
      setErrMsg("Incorrect Username or Password.");
    }
  }, [jwtToken, loginErr]);

  useEffect(() => {
    if (userData) {
      const role = userData[0].roles[0].name;
      if (role === "ROLE_ADMIN") {
        navigate("/");
      } else {
        setErrMsg("Incorrect Credentials!");
        refreshCaptcha();
      }
    }
  }, [userData]);

  const refreshCaptcha = () => {
    createCaptcha();
  };

  useEffect(() => {
    if (!captchaText) {
      createCaptcha();
    }
  }, [captchaText]);

  const createCaptcha = () => {
    let result = "";
    const char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = char.length;
    let index = 0;
    while (index < 6) {
      result += char.charAt(Math.floor(Math.random() * length));
      index += 1;
    }
    let res = result.split("").join(" ");
    setCaptchaText(res);
  };

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
        method="post"
        id="myForm"
        sx={{
          marginTop: "16px",
          border: "1px solid #ccc",
          position: "absolute",
          width: "400px",
          padding: "18px",
        }}
      >
        <Stack spacing={2} alignContent="center">
          <Typography variant="h4" align="center" color="#7E1717">
            Admin Login
          </Typography>
          <TextField
            variant="outlined"
            name="username"
            value={username}
            label="Email"
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
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Box
              sx={{
                minWidth: "120px",
                height: "50px",
                backgroundImage: `url(${captchaImg})`,
              }}
            >
              <Typography
                pt={1.5}
                align="center"
                variant="h6"
                // color="#7E1717"
                sx={{ fontSize: "20px", fontFamily: "Script MT Bold" }}
              >
                {captchaText}
              </Typography>
            </Box>
            <IconButton
              variant="contained"
              color="primary"
              size="large"
              disableRipple
              onClick={refreshCaptcha}
            >
              <RefreshIcon />
              <Typography>Refresh</Typography>
            </IconButton>
            <TextField
              required
              id="captchaField"
              label="Enter Captcha"
              name="captchaField"
              onChange={(e) => setUserCaptcha(e.target.value)}
            />
          </Stack>

          <Typography color="error">
            {errMsg ? errMsg : captchaErr ? captchaErr : null}
          </Typography>
          <Stack alignItems="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100px",
                // marginLeft: "30px",
                backgroundColor: "#E55807",
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
          <Stack alignItems="center">
            <Link to="/forgot-password">Forgot Password </Link>
          </Stack>
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
};

const mapStateToProps = ({ adminReducer, reducerUser }) => {
  return {
    loginLoading: adminReducer.adminLoginLoading,
    loginSucc: adminReducer.adminLoginSucc,
    loginErr: adminReducer.adminLoginErr,
    jwtToken: adminReducer.jwtToken,
    userData: reducerUser.userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loginAdmin: (payload) => {
      dispatch(actionType.adminLogin(payload));
    },
    resetAdminMsg: () => {
      dispatch(actionType.resetAdminMsg());
    },
    getUserDetails: (payload) => {
      dispatch(actionType.getUserDetails(payload));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
