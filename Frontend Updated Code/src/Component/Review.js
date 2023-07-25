import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import * as actionType from "../redux-saga/actions";
import { connect } from "react-redux";
import jwt from "jwt-decode";
import { useLocation, useNavigate} from "react-router-dom";

function Review(props) {
  const { actions, addLoading, addSucc, addErr } = props;
  const location = useLocation();
  const [clickStar, setClickStar] = useState(false);
  const [message, setMessage] = useState("");
  const [planName, setPlanName] = useState(location.state.policy?.policy_name);
  const [rating, setRating] = useState(0);
  const [openMsg, setOpenMsg] = useState(false);
  const token = localStorage.getItem("token");
  const email = jwt(token).sub;
  const navigate = useNavigate()

  const handleClick = (value) => {
    setRating(value);
    setClickStar(true);
    // alert("Rating is" + rating);
  };

  const handleClose = () => {
    setOpenMsg(false);
    setMessage("");
    setRating(0);
    navigate("/profile")
  };
  const handleSubmit = () => {
    console.log("location.state.userData.firstname", location.state.userData);
    const review = {
      email: email,
      policy_name: planName,
      comments: message,
      ratings: rating,
      approval_status: false,
      first_name: location.state.userData[0].firstname,
      last_name: location.state.userData[0].lastname,
    };
    actions.addReview({ review, jwtToken: token });
  };

  useEffect(() => {
    if (addSucc) {
      setOpenMsg(true);
    }
  }, [addSucc]);

  const handleCancel = () => {
    setMessage("");
    setRating(0);
  };
  return (
    <Box
      sx={{ marginTop: "10px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={3}>
        <Typography variant="h6" align="center">
          Write a Review
        </Typography>
        <Box
          sx={{
            height: "250px",
            width: "450px",
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <Box component="form">
            <Stack spacing={2}>
              <TextField
                label="Plan Name"
                value={planName}
                fullWidth
                required
              />
              <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <Stack direction="row" justifyContent="center" paddingTop={2}>
              <IconButton
                onClick={() => handleClick(1)}
                sx={{
                  color: clickStar && rating >= 1 ? "orange" : "none",
                }}
              >
                <StarIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClick(2)}
                sx={{
                  color: clickStar && rating >= 2 ? "orange" : "none",
                }}
              >
                <StarIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClick(3)}
                sx={{
                  color: clickStar && rating >= 3 ? "orange" : "none",
                }}
              >
                <StarIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClick(4)}
                sx={{
                  color: clickStar && rating >= 4 ? "orange" : "none",
                }}
              >
                <StarIcon />
              </IconButton>
              <IconButton
                onClick={() => handleClick(5)}
                sx={{
                  color: clickStar && rating >= 5 ? "orange" : "none",
                }}
              >
                <StarIcon />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              paddingTop={3}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMsg}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thanks for giving a Review!
        </Alert>
      </Snackbar>
    </Box>
  );
}

const mapStateToProps = ({ testimonialReducer }) => {
  return {
    addSucc: testimonialReducer.testSucc,
    addErr: testimonialReducer.testErr,
    addLoading: testimonialReducer.testLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addReview: (payload) => {
      dispatch(actionType.addReview(payload));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Review);
