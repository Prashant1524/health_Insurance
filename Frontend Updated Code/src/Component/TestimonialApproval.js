import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import Navbar from "./Header";
import { connect } from "react-redux";
import * as actionType from "../redux-saga/actions";

const TestimonialApprovalPage = (props) => {
  const { actions, testimonialData, delSucc } = props;
  const [approvalData, setApprovalData] = useState(null);
  const [getCall, setGetCall] = useState(false);
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    actions.getTestimonialReview({ jwtToken });
    setGetCall(false);
    if (testimonialData) {
      const data = testimonialData.filter(
        (item) => item.approval_status === false
      );
      setApprovalData(data);
    }
    console.log("Testimonial Approval Data----", approvalData);
  }, [getCall]);

  useEffect(() => {
    if (!testimonialData) {
      actions.getTestimonialReview({ jwtToken });
    }
    if (testimonialData) {
      const data = testimonialData.filter(
        (item) => item.approval_status === false
      );
      setApprovalData(data);
    }
  }, [testimonialData]);

  const handleApprove = (testimonial) => {
    setGetCall(true);
    console.log("Testimonial Data is", testimonial);
    const data = {
      id: testimonial.id,
      email: testimonial.email,
      comments: testimonial.comments,
      first_name: testimonial.first_name,
      last_name: testimonial.last_name,
      policy_name: testimonial.policy_name,
      ratings: testimonial.ratings,
      approval_status: true,
    };
    actions.updateTestimonial({ data });
  };

  const handleCancel = (testimonial) => {
    actions.deleteTestimonial({ id: testimonial.id, jwtToken });
  };

  useEffect(() => {
    if (delSucc) {
      setGetCall(true);
    }
  },[delSucc]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
    >
      <Box maxWidth="500px">
        <Typography variant="h5" gutterBottom align="center">
          Testimonial Approval Page
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          {approvalData && approvalData.length != 0 ? (
            approvalData?.map((testimonial) => (
              <Card key={testimonial.id} sx={{ marginBottom: "16px" }}>
                {/* <CardHeader
               variant="h6"
                title={
                  "Name :" +
                  " " +
                  testimonial.first_name +
                  " " +
                  testimonial.last_name
                }
                sx={{ fontSize: "15px" }}
              /> */}
                <CardContent variant="h6">
                  <Typography py={1}>
                    {" "}
                    {"User Name :" +
                      " " +
                      testimonial.first_name +
                      " " +
                      testimonial.last_name}
                  </Typography>
                  <Typography>
                    Plan Name: {" " + testimonial.policy_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comments: {" " + testimonial.comments}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {" " + testimonial.ratings}
                  </Typography>
                </CardContent>
                {!testimonial.approval_status && (
                  <CardActions>
                    <Button
                      variant="contained"
                      onClick={() => handleApprove(testimonial)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleCancel(testimonial)}
                      color="error"
                    >
                      Reject
                    </Button>
                  </CardActions>
                )}
              </Card>
            ))
          ) : (
            <Stack
              direction="row"
              justifyContent="center"
              sx={{
                marginTop: "50px",
                height: "230px",
                width: "400px",
                border: "1px solid #ccc",
                padding: "20px",
              }}
            >
              <Typography variant="h6" color="error">
                No New Testimonial Found
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ testimonialReducer }) => {
  return {
    testimonialData: testimonialReducer.testimonialData,
    delSucc: testimonialReducer.delSucc,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getTestimonialReview: (payload) => {
      dispatch(actionType.getReview(payload));
    },
    updateTestimonial: (payload) => {
      dispatch(actionType.updateTestimonial(payload));
    },
    deleteTestimonial: (payload) => {
      dispatch(actionType.deleteTestimonial(payload));
    },
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestimonialApprovalPage);
