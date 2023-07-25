import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/forgotPassword.css";
import fp from "../images/forgotPassImage.png";
import { Button, Modal, Divider, Box, Typography, Stack } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector, useDispatch } from "react-redux";
import * as actionType from "../redux-saga/actions";
import SendIcon from "@mui/icons-material/Send";

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

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [userOtp, setUserOtp] = useState(null);
  const [openOtp, setOpenOtp] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const userData = useSelector((state) => state.reducerUser.userData);
  const otpSentMsg = useSelector((state) => state.reducerUser.otpMsg);
  const [resend, setResend] = useState(false);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("token");

  const navigate = useNavigate();
  const handlefp = (e) => {
    e.preventDefault();
    if (!email) {
      setOpen(true);
      setErrMsg("Please Enter Registered Email.");
    }
    dispatch(actionType.getUserDetails({ email, jwtToken }));
  };

  const sendOtp = () => {
    let OTP = Math.floor(100000 + Math.random() * 900000);
    userData[0].otp = OTP;
    setGeneratedOTP(userData[0].otp);
    dispatch(actionType.sendOtpToEmail({ userData: userData[0] }));
  };

  const handleSubmit = () => {
    console.log("UserOTP==", userOtp);
    console.log("Generated OTP=", generatedOTP);
    if (Number(userOtp) === generatedOTP) {
      dispatch(actionType.resetUserDataMsg());
      navigate("/reset-password", { state: { email: email } });
    } else {
      setErrMsg("OTP Entered is Wrong.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (otpSentMsg) {
      dispatch(actionType.resetOtpMsg());
      setErrMsg();
    }
  };

  useEffect(() => {
    if (userData?.length > 0) {
      sendOtp();
      setOpenOtp(true);
    } else if (email) {
      setOpen(true);
      setErrMsg(
        "Invalid Email or Entered email is not registered with our E-cart application."
      );
    } else if (!email && resend) {
      setOpen(true);
      setErrMsg("Please Enter Registered Email.");
    }
  }, [userData]);

  useEffect(() => {
    if (otpSentMsg) {
      setOpen(true);
      setResend(true);
    } else {
      console.log("OTP not send error");
    }
  }, [otpSentMsg]);

  return (
    <Box marginTop="30px">
      <Stack direction="row" spacing={10} justifyContent="center">
        <Box sx={{ height: "300px", width: "400px" }}>
          <img className="im" src={fp} alt="fp" height="300px" width="400px" />
        </Box>
        <Box>
          <form>
            <h1>Email Verification</h1>
            <input
              className="fi"
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handlefp}>
              {!resend ? "Send OTP" : "Resend OTP"}
              <SendIcon sx={{ pl: "6px" }} />
            </Button>
            <br />
            <br />
            {openOtp && (
              <>
                <input
                  className="fi"
                  type="text"
                  placeholder="Enter OTP"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "120px", height: "50px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>{" "}
              </>
            )}
          </form>
          <Modal open={open} onClose={() => handleClose()}>
            <Box sx={modalStyle} p={2}>
              <Stack direction="row" justifyContent="end">
                <Button>
                  <CloseOutlinedIcon
                    sx={{ color: "red" }}
                    onClick={() => handleClose()}
                  />
                </Button>
              </Stack>
              <Divider sx={{ backgroundColor: "blue" }} />
              {otpSentMsg ? (
                <Typography p={2} sx={{ color: "green" }}>
                  {otpSentMsg}
                </Typography>
              ) : (
                <Typography p={2} sx={{ color: "red" }}>
                  {errMsg}
                </Typography>
              )}
            </Box>
          </Modal>
        </Box>
      </Stack>
    </Box>
  );
}
export default ForgotPassword;
