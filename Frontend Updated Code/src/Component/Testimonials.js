import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import * as actionType from "../redux-saga/actions";
import { connect } from "react-redux";

const Testimonials = (props) => {
  const { actions, testimonialData } = props;
  const [reviewData, setReviewData] = useState();
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    console.log("Testimonial Data");
    actions.getTestimonialReview({ jwtToken });
  }, []);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    console.log("Name is", name);
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    if (testimonialData) {
      const data = testimonialData.filter(
        (item) => item.approval_status === true
      );
      setReviewData(data);
    }
  }, [testimonialData]);

  return (
    <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
      {reviewData?.map((review, index) => {
        const name = review.first_name + " " + review.last_name;
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ width: 300, height: "100%" }}>
              <CardHeader
                // avatar={
                //   <Avatar src={review.first_name + ".jpg"} alt={review.name}>
                //     {...stringAvatar({review.first_name})}
                //     </Avatar>
                // }
                avatar={<Avatar {...stringAvatar(name)} />}
                title={review.first_name + " " + review.last_name}
                subheader={review.date}
              />
              <CardContent>
                <Typography variant="body2" color="secondary">
                  Plan Name: {review.policy_name}
                </Typography>
                <Typography variant="body2">{review.comments}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  {Array.from({ length: review.ratings }).map((_, index) => (
                    <StarIcon key={index} sx={{ color: "#fbc02d" }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export const mapStateToProps = ({ testimonialReducer }) => {
  return {
    testimonialData: testimonialReducer.testimonialData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getTestimonialReview: (payload) => {
      dispatch(actionType.getReview(payload));
    },
    addTestimonialReview: (payload) => {
      dispatch(actionType.addReview(payload));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);
