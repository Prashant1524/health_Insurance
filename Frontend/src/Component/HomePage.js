import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const policyList = [
  {
    image:
      "https://tse1.mm.bing.net/th/id/OIP.QNxoYG037AR3R6Orge9pxgHaFS?pid=ImgDet&rs=1",
    name: "Health Insurance Policy",
    description:
      "Health Insurance Policy provides cashless hospitalization,in-patient and out-patient hospitalization, critical illness benefits.",
  },
  {
    image:
      "https://tse1.mm.bing.net/th/id/OIP.QNxoYG037AR3R6Orge9pxgHaFS?pid=ImgDet&rs=1",
    name: "Individual Health Insurance Plan",
    description:
      "Health Insurance Policy provides cashless hospitalization,in-patient and out-patient hospitalization, critical illness benefits.",
  },
  {
    image:
      "https://tse1.mm.bing.net/th/id/OIP.QNxoYG037AR3R6Orge9pxgHaFS?pid=ImgDet&rs=1",
    name: "Family Floater Health Insurance Plan",
    description:
      "Health Insurance Policy provides cashless hospitalization,in-patient and out-patient hospitalization, critical illness benefits.",
  },
  {
    image:
      "https://tse1.mm.bing.net/th/id/OIP.QNxoYG037AR3R6Orge9pxgHaFS?pid=ImgDet&rs=1",
    name: "Critical Illness Insurance Plan",
    description:
      "Health Insurance Policy provides cashless hospitalization,in-patient and out-patient hospitalization, critical illness benefits.",
  },
];

function HomePage() {
  return (
    <Box sx={{ padding: "20px" }}>
      <Stack direction="row" sx={{ marginTop: "30px", marginLeft: "30px" }}>
        <Box
          sx={{
            backgroundImage:
              "url(https://tse2.mm.bing.net/th/id/OIP.7JWGKej_fhfl2V_-h2bGVQHaEK?w=327&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7)",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            height: "300px",
            width: "600px",
          }}
        />
        <Box sx={{ padding: "50px" }}>
          <Typography variant="h5" color="#7E1717">
            A healthier you, a healthier community !!!
          </Typography>
          <Button
            variant="contained"
            sx={{
              padding: "10px",
              backgroundColor: "#E55807",
              color: "#FFFFF",
              marginTop: "40px",
            }}
          >
            View Plans
          </Button>
        </Box>
      </Stack>
      <Typography align="center" variant="h5" sx={{ paddingTop: "50px" }}>
        List of Policies
      </Typography>
      <Box sx={{ padding: "20px", display: "flex" }} gap={6}>
        {policyList.map((policy) => {
          return (
            <Card
              sx={{
                height: "300px",
                width: "300px",
                backgroundColor: "#ECF8F9",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="https://tse1.mm.bing.net/th/id/OIP.QNxoYG037AR3R6Orge9pxgHaFS?pid=ImgDet&rs=1"
                  height="100px"
                  sx={{
                    maxWidth: "150px",
                    paddingTop: "20px",

                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {policy.name}
                  </Typography>
                  <Typography variant="body2">{policy.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default HomePage;
