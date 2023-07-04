import React from 'react';
import { Typography, Card, CardContent, CardHeader, Avatar, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
const reviews = [
    {
      name: 'Varada Datar',
      avatar: 'varada-atar-avatar.jpg',
      date: 'June 28, 2023',
      comment: 'The insurance policy provided me with great peace of mind. The customer service was excellent, and the agents were knowledgeable and helpful. I am glad I chose this insurance company.',
      policy: 'Auto Insurance',
      rating: 4.5,
    },
    {
        name: 'Michael Johnson',
        avatar: 'michael-johnson-avatar.jpg',
        date: 'July 1, 2023',
        comment: 'I had a claim recently, and the insurance company handled it promptly and fairly. They provided timely updates and ensured a hassle-free experience. I would recommend their policies to anyone.',
        policy: 'Term Insurance',
        rating: 4,
      },
      {
        name: 'Emily Davis',
        avatar: 'emily-davis-avatar.jpg',
        date: 'July 2, 2023',
        comment: 'The insurance policy offers competitive rates without compromising on coverage. The online platform is user-friendly, making it convenient to manage my policy and access important information.',
        policy: 'Life Insurance',
        rating: 3,
      },
    {
      name: 'Ashwini Kadadas',
      avatar: 'ashwini-kadadas-avatar.jpg',
      date: 'June 30, 2023',
      comment: 'I am extremely satisfied with the insurance policy I purchased. It offers comprehensive coverage and the claim process was smooth and efficient. Highly recommended!.',
      policy: 'Home Insurance',
      rating: 5,
    },
    // Add more review objects as needed
  ];
const Testimonials = () => {

  return (
    <Grid container spacing={3}>
      {reviews.map((review, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ width: 300, height: '100%' }}>
            <CardHeader
              avatar={<Avatar src={review.avatar} alt={review.name} />}
              title={review.name}
              subheader={review.date}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {review.comment}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Policy: {review.policy}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <StarIcon key={index} sx={{ color: '#fbc02d' }} />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;