import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  InputLabel,
} from "@mui/material";
import Testimonials from "./Testimonials";
import * as actionType from "../redux-saga/actions";
import { connect } from "react-redux";
import jwt from "jwt-decode";
import "../styles/InsurancePolicyPage.css";
import UserPolicy from "./UserPolicy";

const InsurancePolicyPage = (props) => {
  const {
    actions,
    policyList,
    policyErr,
    addSucc,
    addErr,
    userData,
    testimonialData,
    userPolicy,
  } = props;
  const [policies, setPolicies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const token = localStorage.getItem("token");
  const [openReg, setOpenReg] = useState(false);
  const [policyData, setPolicyData] = useState(policyList);
  const jwtToken = localStorage.getItem("token");
  const email = jwt(jwtToken);

  useEffect(() => {
    if (token) {
      const user = jwt(token);
      localStorage.setItem("email", user.sub);
    }
  }, [token]);

  useEffect(() => {
    if (!policyList) {
      actions.getAllPolicy({ jwtToken: token });
    } else {
      setPolicyData(policyList);
    }
    if (!userData) {
      const user = jwt(token);
      actions.getUserData({ email: user.sub });
    } else {
      console.log("UserDate is from policy page...", userData);
    }
  }, [policyList, userData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterPolicies(filterType, event.target.value);
  };

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    filterPolicies(type, searchQuery);
  };

  const filterPolicies = (type, query) => {
    let filteredPolicies = policyList;
    if (type !== "all") {
      filteredPolicies = filteredPolicies.filter(
        (policy) => policy.policy_for === type
      );
    }
    if (query && query != "all") {
      const searchQuery = query;
      filteredPolicies = filteredPolicies.filter((policy) =>
        policy.policy_type.includes(searchQuery)
      );
    }
    setPolicyData(filteredPolicies);
  };

  useEffect(() => {
    actions.getUserPolicy({ email: email.sub, jwtToken });
  }, [userPolicy]);

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  const handleBackClick = () => {
    setSelectedPolicy(null);
  };
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentStep, setPaymentStep] = useState(1);

  const handlePurchaseClick = (policy) => {
    setPaymentModalOpen(true);
    setOpenReg(true);
    console.log("Selected Policy is", policy);
    const policyData = {
      user_id: userData[0].id,
      user_email: userData[0].email,
      user_firstname: userData[0].firstname,
      user_phoneno: userData[0].phone,
      policy_id: policy.policy_id,
      policy_name: policy.policy_name,
      policy_type: policy.policy_type,
      policy_for: policy.policy_for,
      policy_cover_amount: policy.policy_cover_amount,
    };
    actions.addUserPolicy({ policyData, jwtToken: token });
  };

  const handleCloseModal = () => {
    setPaymentModalOpen(false);
    setPaymentStep(1);
  };

  const handlePrintClick = () => {
    window.print(); // Trigger the print dialog for the browser
  };
  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
    setPaymentStep(2);
  };

  const handlePaymentSubmit = () => {
    // Perform payment processing logic here
    // You can redirect to a success page or display a payment confirmation message
    // based on the selected payment option
    console.log("Payment submitted:", selectedPaymentOption);
    // Move to the next step or show payment confirmation
    setPaymentStep(3);
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
          <Typography variant="h4" align="center">
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
                  <Typography>{selectedPolicy.type}</Typography>
                  <Typography variant="h6">Cover Amount:</Typography>
                  <Typography>{selectedPolicy.policy_cover_amount}</Typography>
                  <Typography variant="h6">Start Amount:</Typography>
                  <Typography>{selectedPolicy.policy_start_amount}</Typography>
                  <Typography variant="h6">Benefits:</Typography>
                  <Typography>{selectedPolicy.benefits}</Typography>
                  <Typography variant="h6">Eligibility Criteria:</Typography>
                  <Typography variant="body1">Entry Age:</Typography>
                  <Typography>{selectedPolicy.min_age}</Typography>
                  <Typography variant="body1">Max Entry Age:</Typography>
                  <Typography>{selectedPolicy.max_age}</Typography>
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
                    image={selectedPolicy.policy_image_url}
                    alt={selectedPolicy.policy_name}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: 15 }} className="control-group">
          <Button
            style={{ marginRight: 20, marginTop: 10 }}
            variant="contained"
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Button
            style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
            variant="contained"
            onClick={handlePrintClick}
          >
            Download
          </Button>

          {console.log("User Policy details from button claimed", userPolicy)}
          {userPolicy?.filter(
            (item) => item.policy_id === selectedPolicy.policy_id
          ).length > 0 ? (
            <Button variant="contained" sx={{ backgroundColor: "green", color:"green" }} disabled>
              Claimed
            </Button>
          ) : (
            <Button
              style={{ marginLeft: 20, marginTop: 10 }}
              variant="contained"
              onClick={() => handlePurchaseClick(selectedPolicy)}
            >
              Claim
            </Button>
          )}

          {/* {UserPolicy?.filter((item) => item.policy_name === selectedPolicy)
            .length > 0 ? (
            <Button color="green">Claimed</Button>
          ) : (
            <Button
              style={{ marginLeft: 20, marginTop: 10 }}
              variant="contained"
              onClick={() => handlePurchaseClick(selectedPolicy)}
            ></Button>
          )} */}
        </Grid>

        <Grid item xs={12} className="control-group2">
          <Testimonials />
        </Grid>
        <Modal
          open={isPaymentModalOpen}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "4px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            {paymentStep === 1 && (
              <>
                <Typography variant="h4">Payment Gateway - Step 1</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="paymentOptions"
                    name="paymentOptions"
                    value={selectedPaymentOption}
                    onChange={handlePaymentOptionChange}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Card Payment"
                    />
                    <FormControlLabel
                      value="upi"
                      control={<Radio />}
                      label="UPI Payment"
                    />
                    <FormControlLabel
                      value="netbanking"
                      control={<Radio />}
                      label="Net Banking"
                    />
                  </RadioGroup>
                </FormControl>
              </>
            )}
            {paymentStep === 2 && (
              <>
                <Typography variant="h4">Payment Gateway - Step 2</Typography>
                {/* Add additional fields or components for the next step of the payment gateway */}
                <Button variant="contained" onClick={handlePaymentSubmit}>
                  Submit Payment
                </Button>
              </>
            )}
            {paymentStep === 3 && (
              <>
                <Typography variant="h4">Payment Gateway - Step 3</Typography>
                {/* Show payment confirmation or redirect to a success page */}
                <Typography variant="body1">
                  Payment Successful! Thank you for your purchase.
                </Typography>
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </>
            )}
          </div>
        </Modal>
      </Grid>
    );
  }

  // Render the policy listing page
  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Insurance Policies
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" required>
            Policy Type
          </InputLabel>
          <Select value={searchQuery} onChange={handleSearchChange} fullWidth>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Half Yearly">Half Yearly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" required>
            Policy For
          </InputLabel>
          <Select value={filterType} onChange={handleFilterChange} fullWidth>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Individual/Family">Both</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {policyData?.map((policy) => (
            <Grid item xs={6} key={policy.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color={"crimson"} variant="h6">
                        {policy?.policy_name}
                      </Typography>
                      <Typography variant="h6">Cover Amount:</Typography>
                      <Typography>{policy?.policy_cover_amount}</Typography>
                      <Typography variant="h6">Start Amount:</Typography>
                      <Typography>
                        {"Rs." + policy?.policy_start_amount + "/month"}
                      </Typography>
                      <Typography variant="h6">Description:</Typography>
                      <Typography>{policy?.description}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => handlePolicyClick(policy)}
                        style={{ marginRight: 20, marginTop: 10 }}
                      >
                        View Details
                      </Button>
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
                        image={policy.policy_image_url}
                        alt={policy.name}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Testimonials />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  reducerUser,
  policyReducer,
  userPolicyReducer,
  testimonialReducer,
}) => {
  return {
    policyList: policyReducer.policyList,
    policyErr: policyReducer.policyErr,
    addErr: userPolicyReducer.addErr,
    addSucc: userPolicyReducer.addSucc,
    userData: reducerUser.userData,
    testimonialData: testimonialReducer.testimonialData,
    userPolicy: userPolicyReducer.userPolicy,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getAllPolicy: (payload) => {
      dispatch(actionType.getPolicies(payload));
    },
    addUserPolicy: (payload) => {
      dispatch(actionType.addUserPolicy(payload));
    },
    getUserData: (payload) => {
      dispatch(actionType.getUserDetails(payload));
    },
    getTestimonial: (payload) => {
      dispatch(actionType.getReview(payload));
    },
    getUserPolicy: (payload) => {
      dispatch(actionType.getUserPolicy(payload));
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsurancePolicyPage);
