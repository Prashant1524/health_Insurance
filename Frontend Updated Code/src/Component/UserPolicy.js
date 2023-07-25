import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Stack,
} from "@mui/material";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function UserPolicy(props) {
  const { actions, userPolicy } = props;
  const token = localStorage.getItem("token");
  const user = jwt(token);
  localStorage.setItem("email", user.sub);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const userData = useSelector((state) => state.reducerUser.userData);
  const policyData = useSelector((state) => state.userPolicyReducer.userPolicy);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getUserPolicy({ jwtToken: token, email: user.sub });
  }, []);

  const handleReviewClick = (policy) => {
    navigate("/review", { state: { policy, userData } });
  };

  const handleBackClick = () => {
    setSelectedPolicy(null);
  };
  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  if (selectedPolicy) {
    // Render the policy details page
    return (
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Policy Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ margin: 20 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Name:</Typography>
                  <Typography>{selectedPolicy.policy_name}</Typography>
                  <Typography variant="h6">Type:</Typography>
                  <Typography>{selectedPolicy.policy_type}</Typography>
                  <Typography variant="h6">Cover Amount:</Typography>
                  <Typography>{selectedPolicy.policy_cover_amount}</Typography>
                  <Typography variant="h6">Start Amount:</Typography>
                  <Typography>
                    {selectedPolicy.policy_start_amount + " Rs. /month"}
                  </Typography>
                  <Typography variant="h6">Benefits:</Typography>
                  <Typography>{selectedPolicy.benefits}</Typography>

                  <Button
                    style={{ marginRight: 20, marginTop: 10 }}
                    variant="contained"
                    onClick={handleBackClick}
                  >
                    Back
                  </Button>
                  {/* <Button
                    style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
                    variant="contained"
                    onClick={handlePrintClick}
                  >
                    Download
                  </Button> */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardMedia
                    component="img"
                    image={selectedPolicy.imageUrl}
                    alt={selectedPolicy.name}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2} style={{ margin: 3 }} marginBottom={10}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Purchased Policies
            </Typography>
          </Grid>
          <Grid item xs={12} marginBottom={10}>
            <Grid container spacing={2}>
              {userPolicy?.map((policy) => (
                <Grid item xs={6} key={policy.id}>
                  <Card style={{ maxHeight: "400px" }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography color={"crimson"} variant="h6">
                            {policy.policy_name}
                          </Typography>
                          <Typography variant="h6">Cover Amount:</Typography>
                          <Typography>{policy.policy_cover_amount}</Typography>
                          <Typography variant="h6">Start Amount:</Typography>
                          <Typography>
                            {policy.policy_start_amount + " Rs. /month"}
                          </Typography>
                          <Typography variant="h6">Benefits:</Typography>
                          <Typography>{policy.benefits}</Typography>
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              onClick={() => handlePolicyClick(policy)}
                              // style={{ marginRight: 20, marginTop: 10 }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => handleReviewClick(policy)}
                              // style={{ marginRight: 20, marginTop: 10 }}
                            >
                              Give Review
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          display="flex"
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <CardMedia
                            component="img"
                            image={policy.imageUrl}
                            alt={policy.name}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapStateToProps = ({ userPolicyReducer }) => {
  return {
    userPolicy: userPolicyReducer.userPolicy,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getUserPolicy: (payload) => {
      dispatch(actionType.getUserPolicy(payload));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPolicy);
