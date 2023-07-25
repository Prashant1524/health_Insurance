import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";

const AddPolicy = (props) => {
  const { actions, succ, err } = props;
  const [name, setName] = useState("");
  const [coverAmt, setCoverAmt] = useState("");
  const [policyFor, setPolicyFor] = useState("");
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [type, setType] = useState();
  const [desc, setDesc] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [benefits, setBenefits] = useState("");
  const [startAmt, setStartAmt] = useState();
  const jwtToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const el = document.getElementById("myForm");
    if (el) {
      el.addEventListener("submit", function (evt) {
        evt.preventDefault();
        // do you ajax submission here
        const policyData = {
          policy_name: name,
          policy_image_url: imgUrl,
          policy_cover_amount: coverAmt,
          policy_start_amount: parseInt(startAmt),
          policy_type: type,
          policy_for: policyFor,
          description: desc,
          min_age: minAge,
          maxAge: maxAge,
        };
        actions.addPolicy({ jwtToken, policyData });
        console.log("submitted");
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

  const handleCancel = () => {
    setName("");
    setCoverAmt("");
    setPolicyFor("");
    setMinAge("");
    setMaxAge("");
    setType("");
    setDesc("");
    setImgUrl("");
    setBenefits("");
    setStartAmt("");
  };

  const handleClose = () => {
    setOpen(false);
    actions.resetMsg();
    handleCancel();
  };

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography variant="h5" align="center">
        Add Policy
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
          component="form"
          id="myForm"
          sx={{
            display: "block",
            width: "450px",
            minHeight: "400px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            padding: "40px",
          }}
          gap={4}
        >
          <Stack spacing={3}>
            <TextField
              label="Policy Name"
              name="policyName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Policy Cover Amount"
              name="policyCoverAmt"
              value={coverAmt}
              onChange={(e) => setCoverAmt(e.target.value)}
              required
            />
            {/* <TextField
              label="Policy For"
              name="policyFor"
              required
              value={policyFor}
              onChange={(e) => setPolicyFor(e.target.value)}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Policy For</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={policyFor}
                label="Age"
                onChange={(e) => setPolicyFor(e.target.value)}
              >
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="Individual/Family">Both</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Policy Start Amount"
              name="policyStartAmt"
              value={startAmt}
              onChange={(e) => setStartAmt(e.target.value)}
            />
            <TextField
              label="Benefits"
              name="policyBenefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              required
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Policy Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Policy Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Policy Description"
              name="policyDesc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <TextField
              label="Policy Image Url"
              name="policyImgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Min Entry Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Entry Age"
                onChange={(e) => setMinAge(e.target.value)}
              >
                {Array.from({ length: 100 }, (_, x) => {
                  return x >= 10 && <MenuItem value={x}>{x}</MenuItem>;
                })}
                <MenuItem value="NA">NA</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Max Entry Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maxAge}
                label="Max Entry Age"
                onChange={(e) => setMaxAge(e.target.value)}
              >
                {Array.from({ length: 110 }, (_, x) => {
                  return x >= 10 && <MenuItem value={x}>{x}</MenuItem>;
                })}
                <MenuItem value="NA">NA</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100px",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "100px" }}
                onClick={() => handleCancel()}
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
            New Policy Succesfully Added!
          </Alert>
        ) : err ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error while adding policy. Try again!
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
};

const mapStateToProps = ({ policyReducer }) => {
  return {
    succ: policyReducer.addPolicySucc,
    err: policyReducer.addPolicyErr,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addPolicy: (payload) => {
      dispatch(actionType.addPolicy(payload));
    },
    resetMsg: () => {
      dispatch(actionType.resetPolicyMsg());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicy);
