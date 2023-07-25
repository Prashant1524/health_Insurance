import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";

const AddAnnouncement = (props) => {
  const { actions, succ, err } = props;
  const [message, setMessage] = useState("");
  const [expireTime, setExpireTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const jwtToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    console.log("expire time", expireTime);
    console.log("new Date().toISOString()", new Date().toISOString());
    const el = document.getElementById("myForm");
    if (el) {
      el.addEventListener("submit", function (evt) {
        evt.preventDefault();
        const announceData = {
          annoucementTextData: message,
          // startTime: new Date().toISOString(),
          startTime: startTime,
          endTime: expireTime,
        };
        actions.addAnnouncement({ jwtToken, announceData });
      });
    }
  };

  useEffect(() => {
    if (succ) {
      setOpen(true);
    }
    if (err) {
      setOpen(true);
    }
  }, [succ, err]);

  const handleClose = () => {
    setOpen(false);
    actions.resetAnnMsg();
    handleCancel();
  };
  const handleCancel = () => {
    setMessage("");
    setExpireTime("");
  };
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography variant="h5" align="center">
        Add New Announcement
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          marginBottom: "40px",
        }}
      >
        <Box
          id="myForm"
          component="form"
          sx={{
            display: "block",
            width: "450px",
            minHeight: "200px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            padding: "40px",
          }}
          gap={4}
        >
          <Stack spacing={3}>
            <TextField
              label="Announcement Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <FormControl fullWidth sx={{ m: 1 }} required>
              <InputLabel htmlFor="outlined-adornment-start-time">
                Announcement Start Time
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-start-time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                label="Announcemnet Start Time"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} required>
              <InputLabel htmlFor="outlined-adornment-expire-time">
                Announcement Expire Time
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-expire-time"
                type="datetime-local"
                value={expireTime}
                onChange={(e) => setExpireTime(e.target.value)}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label="Announcemnet Expire Time"
              />
            </FormControl>
            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  width: "100px",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "100px" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {succ ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            New Announcement Succesfully Added!
          </Alert>
        ) : err ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error while adding Announcements. Try again!
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
};

const mapStateToProps = ({ announcementReducer }) => {
  return {
    succ: announcementReducer.addSucc,
    err: announcementReducer.addErr,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addAnnouncement: (payload) => {
      dispatch(actionType.addAnnouncement(payload));
    },
    resetAnnMsg: () => {
      dispatch(actionType.resetAnnMsg());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAnnouncement);
