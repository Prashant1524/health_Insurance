import React, { useState } from "react";
import "./InsurancePolicyPage.css";
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
} from "@mui/material";
import Testimonials from "./Testimonials";
const policiesData = [
  {
    id: 1,
    name: "Health Insurance",
    type: "Health",
    coverAmount: "Up to $1 million",
    startAmount: "$50/month",
    goodFor: "Individuals and families",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/03/13/01/33/insurance-7065113_1280.png",
  },
  {
    id: 2,
    name: "Car Insurance",
    type: "Car",
    coverAmount: "Up to $50,000",
    startAmount: "$100/month",
    goodFor: "Vehicle owners",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/12/01/09/17/car-7628693_1280.png",
  },
  {
    id: 3,
    name: "Home Insurance",
    type: "Home",
    coverAmount: "Up to $500,000",
    startAmount: "$150/month",
    goodFor: "Homeowners",
    imageUrl:
      "https://img.freepik.com/free-vector/illustration-house-insurance_53876-28551.jpg?w=826&t=st=1688373220~exp=1688373820~hmac=5afb9b34f2f93aa5ad02d365cf804eae788f3fe65c6fd8a5ae8095563f972e6f",
  },
  {
    id: 4,
    name: "Home Insurance",
    type: "Home",
    coverAmount: "Up to $800,000",
    startAmount: "$250/month",
    goodFor: "Homeowners",
    imageUrl:
      "https://img.freepik.com/free-vector/illustration-people-with-insurance-policy_53876-43704.jpg?w=826&t=st=1688373274~exp=1688373874~hmac=aa735edb2e820c8c13b6a95b2a9b82144aaa9ad995f6c10802d742c7539b0aad",
  },
  {
    id: 5,
    name: "Term Insurance",
    type: "Term",
    coverAmount: "Up to $1 million",
    startAmount: "$50/month",
    goodFor: "everyone",
    imageUrl:
      "https://img.freepik.com/free-vector/insurance-protection-from-financial-loss-risk-management-health-life-property-income-insurance_335657-839.jpg?w=740&t=st=1688373326~exp=1688373926~hmac=5f65c40b112668189215faa8eae2af601c1ac3be6df498127547112eb5cf92ce",
  },
  {
    id: 6,
    name: "Life Insurance",
    type: "Life",
    coverAmount: "Up to $1 million",
    startAmount: "$50/month",
    goodFor: "Individuals and families",
    imageUrl:
      "https://img.freepik.com/free-vector/illustration-life-insurance_53876-5308.jpg?w=1060&t=st=1688373374~exp=1688373974~hmac=da86d960a00a3948bfb8c5a7edfbc565747761d5cf8e1fe4371319870dd34f56",
  },

  // Add more policies as needed
];

const InsurancePolicyPage = () => {
  const [policies, setPolicies] = useState(policiesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedPolicy, setSelectedPolicy] = useState(null);

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
    let filteredPolicies = policiesData;

    if (type !== "all") {
      filteredPolicies = filteredPolicies.filter(
        (policy) => policy.type === type
      );
    }

    if (query) {
      const searchQuery = query.toLowerCase();
      filteredPolicies = filteredPolicies.filter((policy) =>
        policy.name.toLowerCase().includes(searchQuery)
      );
    }

    setPolicies(filteredPolicies);
  };

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  const handleBackClick = () => {
    setSelectedPolicy(null);
  };
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentStep, setPaymentStep] = useState(1);
  const handlePurchaseClick = () => {
    setPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setPaymentModalOpen(false);
    setPaymentStep(1);
  };

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
    setPaymentStep(2);
  };
  const handlePrintClick = () => {
    window.print(); // Trigger the print dialog for the browser
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
                  <Typography>{selectedPolicy.name}</Typography>
                  <Typography variant="h6">Type:</Typography>
                  <Typography>{selectedPolicy.type}</Typography>
                  <Typography variant="h6">Cover Amount:</Typography>
                  <Typography>{selectedPolicy.coverAmount}</Typography>
                  <Typography variant="h6">Start Amount:</Typography>
                  <Typography>{selectedPolicy.startAmount}</Typography>
                  <Typography variant="h6">Good for:</Typography>
                  <Typography>{selectedPolicy.goodFor}</Typography>
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
        <Grid item xs={12} style={{ marginLeft: 15 }} className="control-group">
          <Button
            style={{ marginRight: 20 }}
            variant="contained"
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Button
            style={{ marginLeft: 20, marginRight: 20 }}
            variant="contained"
            onClick={handlePrintClick}
          >
            Download
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            variant="contained"
            onClick={handlePurchaseClick}
          >
            Purchase
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: 15 }}
          className="control-group2"
        >
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Insurance Policies</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Search policies"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select value={filterType} onChange={handleFilterChange} fullWidth>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Term">Term</MenuItem>
          <MenuItem value="Life">Life</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {policies.map((policy) => (
            <Grid item xs={6} key={policy.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color={"crimson"} variant="h6">
                        {policy.name}
                      </Typography>
                      <Typography variant="h6">Cover Amount:</Typography>
                      <Typography>{policy.coverAmount}</Typography>
                      <Typography variant="h6">Start Amount:</Typography>
                      <Typography>{policy.startAmount}</Typography>
                      <Typography variant="h6">Good for:</Typography>
                      <Typography>{policy.goodFor}</Typography>
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
                        image={policy.imageUrl}
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

export default InsurancePolicyPage;
