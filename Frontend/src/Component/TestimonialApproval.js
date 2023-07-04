import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import Navbar from "./Header";
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    approved: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    approved: true,
  },
  {
    id: 1,
    name: "John Doe 2",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    approved: false,
  },
];

const TestimonialApprovalPage = () => {
  const [testimonialList, setTestimonialList] = useState(testimonials);

  const handleApprove = (id) => {
    const updatedTestimonialList = testimonialList.map((testimonial) => {
      if (testimonial.id === id) {
        return { ...testimonial, approved: true };
      }
      return testimonial;
    });

    setTestimonialList(updatedTestimonialList);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      
    >
      <Box maxWidth="500px">
        <Typography variant="h4" gutterBottom>
          Testimonial Approval Page
        </Typography>
        {testimonialList.map((testimonial) => (
          <Card key={testimonial.id} sx={{ marginBottom: "16px" }}>
            <CardHeader title={testimonial.name} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {testimonial.message}
              </Typography>
            </CardContent>
            {!testimonial.approved && (
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handleApprove(testimonial.id)}
                >
                  Approve
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialApprovalPage;
