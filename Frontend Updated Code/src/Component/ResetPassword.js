import { useState, useEffect } from "react";
import "../styles/style.css";
import {
  Button,
  Modal,
  Divider,
  Box,
  Typography,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector, useDispatch } from "react-redux";
import * as actionType from "../redux-saga/actions";
import { useLocation, useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
};
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sMsg, setSMsg] = useState(null);
  const userData = useSelector((state) => state.reducerUser.userData);
  const setPassMsg = useSelector((state) => state.reducerUser.setPassMsg);
  const setErrMsg = useSelector((state) => state.reducerUser.setErrMsg);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [passErr, setPassErr] = useState("");
  const [access, setnoAccess] = useState(false);

  const handleCp = (e) => {
    const el = document.getElementById("myForm");
    if (el) {
      el.addEventListener("submit", function (evt) {
        evt.preventDefault();
        e.preventDefault();
        if (password.length === 0) {
          // setOpenModal(true);
          setErrorMsg("Please Enter Password.");
        } else if (cpassword.length === 0) {
          // setOpenModal(true);
          setErrorMsg("Please Enter Confirm Password.");
        } else if (password !== cpassword) {
          // setOpenModal(true);
          setPassErr("New Password and Confirm password didn't match!");
          setErrorMsg("New Password and Confirm password didn't match!");
        } else {
          userData[0].password = password;
          dispatch(actionType.updateUserPassword({ userData }));
        }
        console.log(password, cpassword, userData);
      });
    }
  };

  const handleClose = () => {
    if (setPassMsg) {
      setOpenModal(false);
      navigate("/login");
      setSMsg(null);
    }
    setErrorMsg(null);
    setOpenModal(false);
    dispatch(actionType.resetMsg());
  };

  useEffect(() => {
    console.log("location state", location.state);
    if (!location.state) {
      setnoAccess(true);
      console.log("location state true not ", location.state);
    } else {
      setnoAccess(false);
      const email = location.state.email;
      console.log("email from useEffect", email);
      if (!userData) {
        dispatch(actionType.getUserDetails({ email: email }));
      }
    }
  }, [access]);

  useEffect(() => {
    if (setPassMsg) {
      setSMsg(setPassMsg);
      setErrorMsg(null);
      setOpenModal(true);
    }
    if (setErrMsg) {
      setErrorMsg(setErrMsg);
      setSMsg(null);
      setOpenModal(true);
    }
    console.log("setpassmsg", setPassMsg, setErrMsg);
  }, [setPassMsg, setErrMsg]);

  return (
    <Box
      sx={{ height: "300px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="30px"
    >
      {access ? (
        <Box>
          <Typography variant="h5" align="center">
            No Access
          </Typography>
        </Box>
      ) : (
        <Box component="form" id="myForm" method="post">
          <Typography variant="h5" align="center">
            Reset Password
          </Typography>

          <Stack
            spacing={2}
            alignItems="center"
            sx={{
              border: "1px solid #ccc",
              padding: "18px",
              width: "400px",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <TextField
              type="password"
              label="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Confirm Password"
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              fullWidth
              required
            />
            <Typography color="error">{passErr}</Typography>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleCp(e)}
              sx={{ width: "100px" }}
              alignContent="center"
            >
              Reset
            </Button>
          </Stack>
        </Box>
      )}
      <Snackbar
        open={openModal}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {/* <Box sx={modalStyle} p={2}>
          <Stack direction="row" justifyContent="end">
            <Button>
              <CloseOutlinedIcon sx={{ color: "red" }} onClick={handleClose} />
            </Button>
          </Stack>
          <Divider sx={{ backgroundColor: "blue" }} /> */}
        {sMsg ? (
          // <Typography p={2} sx={{ color: "green" }}>
          //   {sMsg}
          // </Typography>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {sMsg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMsg}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default ResetPassword;
