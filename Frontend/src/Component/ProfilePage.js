import React,{ useState } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    encryptedPassword: '****************',
     policies : [
        {
          id: 1,
          name: 'Health Insurance',
          type: 'Health',
          coverAmount: 'Up to $1 million',
          startAmount: '$50/month',
          goodFor: 'Individuals and families',
          imageUrl: 'https://cdn.pixabay.com/photo/2022/03/13/01/33/insurance-7065113_1280.png',
        },
        
        {
          id: 6,
          name: 'Life Insurance',
          type: 'Life',
          coverAmount: 'Up to $1 million',
          startAmount: '$50/month',
          goodFor: 'Individuals and families',
          imageUrl: 'https://img.freepik.com/free-vector/illustration-life-insurance_53876-5308.jpg?w=1060&t=st=1688373374~exp=1688373974~hmac=da86d960a00a3948bfb8c5a7edfbc565747761d5cf8e1fe4371319870dd34f56',
        },
          
          
      
        // Add more policies as needed
      ],
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
  if (selectedPolicy) {
    // Render the policy details page
    return (
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" >
        <Grid item xs={12} >
          <Typography variant="h4">Policy Details</Typography>
        </Grid>
        <Grid item xs={12} >
          <Card style={{margin:20}}>
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

              <Button style={{marginRight:20 , marginTop:10}} variant="contained" onClick={handleBackClick}>
                Back
              </Button>
              <Button style={{marginLeft:20,marginRight:20, marginTop:10}} variant="contained" onClick={handlePrintClick}>
                Download
              </Button>
              
              </Grid>
              <Grid item xs={6} display="flex" justifyContent={"center"} alignItems={"center"}>
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
    <Grid container spacing={2} style={{margin:5}}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">User Details</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Encrypted Password: {user.encryptedPassword}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid container spacing={2} style={{margin:3}}>
      <Grid item xs={12}>
        <Typography variant="h6">Purchased Policies</Typography>
      </Grid>
      <Grid item xs={12}>
  <Grid container spacing={2}>
    {user.policies.map((policy) => (
      <Grid item xs={6} key={policy.id} >
        <Card style={{maxHeight:'400px'}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color={"crimson"} variant="h6">{policy.name}</Typography>
                <Typography variant="h6">Cover Amount:</Typography>
                <Typography>{policy.coverAmount}</Typography>
                <Typography variant="h6">Start Amount:</Typography>
                <Typography>{policy.startAmount}</Typography>
                <Typography variant="h6">Good for:</Typography>
                <Typography>{policy.goodFor}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handlePolicyClick(policy)}
                  style={{marginRight:20 , marginTop:10}}
                >
                  View Details
                </Button>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent={"center"} alignItems={"center"}>
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
  );
};

export default ProfilePage;