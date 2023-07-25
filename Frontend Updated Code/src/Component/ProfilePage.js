import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actionType from "../redux-saga/actions";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

const ProfilePage = () => {
  // const {actions,policyData, userDate} = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.reducerUser.userData);
  const policyData = useSelector((state) => state.userPolicyReducer.userPolicy);
  const jwtToken = localStorage.getItem("token");
  const email = jwt(jwtToken);

  useEffect(() => {
    if (!userData) {
      dispatch(actionType.getUserDetails({ email: email.sub, jwtToken }));
    }
  }, [userData]);

  // useEffect(()=>{
  //   if()
  // })

  useEffect(() => {
    if (!policyData) {
      dispatch(actionType.getUserPolicy({ email: email.sub, jwtToken }));
    }
  }, [policyData]);
  const handleReviewClick = (policy) => {
    navigate("/review", { state: { policy, userData } });
  };
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };
  const handleBackClick = () => {
    setSelectedPolicy(null);
  };

  const handlePrintClick = () => {
    window.print(); // Trigger the print dialog for the browser
  };
  // if (selectedPolicy) {
  //   // Render the policy details page
  //   return (
  //     <Grid
  //       container
  //       spacing={2}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <Grid item xs={12}>
  //         <Typography variant="h4">Policy Details</Typography>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <Card style={{ margin: 20 }}>
  //           <CardContent>
  //             <Grid container spacing={2}>
  //               <Grid item xs={6}>
  //                 <Typography variant="h6">Name:</Typography>
  //                 <Typography>{selectedPolicy.policy_name}</Typography>
  //                 <Typography variant="h6">Type:</Typography>
  //                 <Typography>{selectedPolicy.policy_type}</Typography>
  //                 <Typography variant="h6">Cover Amount:</Typography>
  //                 <Typography>{selectedPolicy.policy_cover_amount}</Typography>
  //                 <Typography variant="h6">Start Amount:</Typography>
  //                 <Typography>
  //                   {selectedPolicy.policy_start_amount + " Rs. /month"}
  //                 </Typography>
  //                 <Typography variant="h6">Benefits:</Typography>
  //                 <Typography>{selectedPolicy.benefits}</Typography>

  //                 <Button
  //                   style={{ marginRight: 20, marginTop: 10 }}
  //                   variant="contained"
  //                   onClick={handleBackClick}
  //                 >
  //                   Back
  //                 </Button>
  //                 {/* <Button
  //                   style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
  //                   variant="contained"
  //                   onClick={handlePrintClick}
  //                 >
  //                   Download
  //                 </Button> */}
  //               </Grid>
  //               <Grid
  //                 item
  //                 xs={6}
  //                 display="flex"
  //                 justifyContent={"center"}
  //                 alignItems={"center"}
  //               >
  //                 <CardMedia
  //                   component="img"
  //                   image={selectedPolicy.imageUrl}
  //                   alt={selectedPolicy.name}
  //                 />
  //               </Grid>
  //             </Grid>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   );
  // }
  return (
    <Grid container spacing={2} style={{ margin: 5, marginBottom: "20px" }}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">User Details</Typography>
            <Typography>
              Name:{" "}
              {userData && userData[0].firstname + " " + userData[0].lastname}
            </Typography>
            <Typography>Email : {userData && userData[0].email}</Typography>
            <Typography>Contact Number : {userData && userData[0].phone}</Typography>
          </CardContent>
        </Card>
      </Grid>

     
    </Grid>
  );
};

export default ProfilePage;
