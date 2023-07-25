import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  Paper,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionType from "../redux-saga/actions";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import "../styles/style.css";
import moment from "moment/moment";

function HomePage(props) {
  const { actions, announceData, err, posData } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const planList = useSelector((state) => state.policyReducer.policyList);
  const [position, setPosition] = useState([{ top: 1, right: 0 }]);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("token");
  const [menu, setMenu] = useState("left");
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [ann, setAnn] = useState(2);
  const [bann, setBann] = useState(1);
  const currentTime = new Date().toISOString();

  const handleViewPlans = () => {
    if (token) {
      navigate("/policies");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    actions.getAnnouncements({ jwtToken });
    actions.getPosition({ jwtToken });
  }, []);

  useEffect(() => {
    const dataItems = [];
    if (announceData) {
      announceData.map((data) => {
        if (new Date(data.startTime).toISOString() < currentTime) {
          dataItems.push(data);
        }
      });
      setAnnouncementsData(dataItems);
    }
  }, [announceData, currentTime]);

  useEffect(() => {
    // if (!posData) {
    //   actions.getPosition({ jwtToken });
    // }
    if (posData) {
      const menubar = posData.filter((pos) => pos.positionName === "Menubar");
      const announce = posData.filter(
        (pos) => pos.positionName === "Announcements"
      );
      const banner = posData.filter((pos) => pos.positionName === "Banner");
      setAnn(announce[0].positionValue);
      setBann(banner[0].positionValue);
      if (menubar[0].positionValue === 1) {
        setMenu("right");
      } else {
        setMenu("left");
      }
    }
  }, [posData]);

  useEffect(() => {
    if (!planList) {
      console.log("token from homepage", token);
      dispatch(actionType.getPolicies({ jwtToken: token }));
    }
    console.log("Plan Details are:", planList);
  }, [planList]);

  const plans = (
    <Box
      marginBottom="100px"
      top={ann === 3 || ann === 4 ? "0px" : "400px"}
      position="relative"
    >
      <Typography align="center" variant="h5" sx={{ paddingTop: "50px" }}>
        List of Plans
      </Typography>
      <Box sx={{ padding: "20px", display: "flex" }} gap={6}>
        {planList?.map((policy) => {
          return (
            <Card
              sx={{
                height: "300px",
                width: "300px",
                backgroundColor: "#ECF8F9",
                marginBottom: "50px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={policy.policy_image_url}
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
                    {policy.policy_name}
                  </Typography>
                  <Typography variant="body2">{policy.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
      <Box></Box>
    </Box>
  );

  return (
    // <Box marginBottom={10}>
    <Box sx={{ padding: "20px", marginBottom: "100px", paddingBottom: "40px" }}>
      {/* <Stack direction="row" sx={{ marginTop: "30px", marginLeft: "30px" }}> */}

      <Stack direction="row" spacing={3}>
        <Box
          elevation={0}
          //className={bann === 1 ? "top-right" : "top-left"}
          sx={{
            position: "absolute",
            height: "400px",
            width: "600px",
            padding: "10px",
            // top: "120px",
            right: bann === 2 || bann === 4 ? "none" : "40px",
            top: bann === 3 || bann === 4 ? "600px" : "100px",
          }}
        >
          <Box
            sx={{
              backgroundImage:
                "url(https://tse2.mm.bing.net/th/id/OIP.7JWGKej_fhfl2V_-h2bGVQHaEK?w=327&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7)",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "300px",
            }}
          />
        </Box>
        {/* <Box sx={{ padding: "50px" }}>
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
            onClick={handleViewPlans}
          >
            View Plans
          </Button>
        </Box> */}

        <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
          <Box
            // className={ann === 1 ? "top-left":"top-right" }
            elevation={2}
            sx={{
              top: ann === 3 || ann === 4 ? "600px" : "100px",
              // right: "30px",
              position: "absolute",
              width: "400px",
              padding: "10px",
              right: ann === 2 || ann === 4 ? "none" : "40px",
            }}
          >
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <Typography variant="h6" align="center" color="#7E1717">
                Announcements
              </Typography>

              <List>
                {announcementsData?.map((item) => {
                  return (
                    <>
                      {" "}
                      <ListItem sx={{ backgroundColor: "#ECF8F9" }}>
                        <ListItemIcon sx={{ color: "#E55807" }}>
                          <NewReleasesIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "#E55807" }}
                          primary={item.annoucementTextData}
                          secondary={moment(new Date(item.startTime)).format(
                            "MMMM D YYYY"
                          )}
                        />
                      </ListItem>
                      <Divider sx={{ marginTop: "10px" }} />
                    </>
                  );
                })}
              </List>
            </Stack>
          </Box>
        </Box>
      </Stack>
      {/* </Stack> */}
      {/* <Box position="relative" top="0px" marginBottom="100px">
          <Typography align="center" variant="h5" sx={{ paddingTop: "50px" }}>
            List of Plans
          </Typography>
          <Box sx={{ padding: "20px", display: "flex" }} gap={6}>
            {planList?.map((policy) => {
              return (
                <Card
                  sx={{
                    height: "300px",
                    width: "300px",
                    backgroundColor: "#ECF8F9",
                    marginBottom:"50px"
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={policy.policy_image_url}
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
                        {policy.policy_name}
                      </Typography>
                      <Typography variant="body2">
                        {policy.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
          <Box></Box>
        </Box> */}
      {plans}
    </Box>
    // </Box>
  );
}

const mapStateToProps = ({ announcementReducer }) => {
  return {
    announceData: announcementReducer.announceData,
    err: announcementReducer.err,
    posData: announcementReducer.positionData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getAnnouncements: (payload) => {
      dispatch(actionType.getAnnouncement(payload));
    },
    getPosition: (payload) => {
      dispatch(actionType.getPosition(payload));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
