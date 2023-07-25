import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  FormControl,
  FormControlLabel,
  Stack,
  RadioGroup,
  Radio,
  TableRow,
} from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actionType from "../redux-saga/actions";
const ArrangeLandingPage = (props) => {
  const { actions, positionData } = props;
  const [menuDirection, setMenuDirection] = useState(1);
  const [announeDirection, setAnnounceDirection] = useState(1);
  const [bannerDirection, setBannerDirection] = useState(2);
  const jwtToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const posData = useSelector(
    (state) => state.announcementReducer.positionData
  );

  useEffect(() => {
    if (!positionData) {
      actions.getPosition({ jwtToken });
    }
    if (positionData != null) {
      setMenuDirection(
        positionData?.filter((item) => item.positionName === "Menubar")[0]
          .positionValue
      );
      setAnnounceDirection(
        positionData?.filter((item) => item.positionName === "Announcements")[0]
          .positionValue
      );
      setBannerDirection(
        positionData?.filter((item) => item.positionName === "Banner")[0]
          .positionValue
      );
    }
    console.log("PositionData is", positionData);
    console.log("direction menu", menuDirection);
    console.log("banner direction", bannerDirection);
    console.log("aann direction", announeDirection);
  }, [positionData]);

  const handleDirectionChange = (event) => {
    setMenuDirection(event.target.value);
    const item = posData.filter((pos) => pos.positionName === "Menubar");
    console.log("item is", item);
    const data = {
      id: item[0].id,
      positionName: item[0].positionName,
      positionValue: event.target.value,
    };
    dispatch(actionType.updatePosition({ data, jwtToken }));
  };

  const handleAnnounceChange = (event) => {
    // alert(event.target.value);
    // alert("announce alert value"+ announeDirection)
    setAnnounceDirection(event.target.value);
    // console.log(
    //   "position of banner and announce",
    //   bannerDirection,
    //   announeDirection
    // );
    if (event.target.value == 1) {
      setBannerDirection(2);
      setAnnounceDirection(1);
    }
    if (event.target.value == 3) {
      setBannerDirection(4);
      setAnnounceDirection(3);
    }
    if (event.target.value == 4) {
      setBannerDirection(3);
      setAnnounceDirection(4);
    }
    if (event.target.value == 2) {
      setBannerDirection(1);
      setAnnounceDirection(2);
    }
    // if (event.target.value === 1) {
    //   setAnnounceDirection(1);
    //   setBannerDirection(2);
    // } else {
    //   setBannerDirection(1);
    //   setAnnounceDirection(2);
    // }
  };

  useEffect(() => {
    // console.log("position-----", announeDirection, bannerDirection);
    if (posData) {
      const item1 = posData.filter(
        (pos) => pos.positionName === "Announcements"
      );
      const item2 = posData.filter((pos) => pos.positionName === "Banner");
      const data = {
        id: item1[0].id,
        positionName: item1[0].positionName,
        positionValue: announeDirection,
      };
      dispatch(actionType.updatePosition({ data, jwtToken }));
      const data2 = {
        id: item2[0].id,
        positionName: item2[0].positionName,
        positionValue: bannerDirection,
      };
      dispatch(actionType.updatePosition({ data: data2, jwtToken }));
    }
  }, [announeDirection, bannerDirection, posData]);

  const handleBannerChange = (event) => {
    // alert(event.target.value);
    setBannerDirection(event.target.value);
    if (event.target.value === 1) {
      setAnnounceDirection(2);
      setBannerDirection(1);
    } else {
      setBannerDirection(2);
      setAnnounceDirection(1);
    }
  };

  return (
    <Box
      style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
    >
      {/* {
    list&&
    list.map((item, index) => (
      <Button variant="contained" style={{ margin:'20px 45%', textAlign:'center'}}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </Button>
      ))} */}
      <TableContainer
        sx={{
          minHeightheight: "300px",
          width: "500px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Items</Typography>
              </TableCell>
              <TableCell>
                <Typography>Position</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Menubar</Typography>
              </TableCell>

              <TableCell>
                <Stack>
                  <FormControl
                    component="fieldset"
                    sx={{ mt: 1, display: "flex" }}
                  >
                    <RadioGroup
                      aria-label="direction"
                      name="direction"
                      value={menuDirection}
                      onChange={handleDirectionChange}
                      row
                    >
                      <FormControlLabel
                        value={1}
                        name="direction"
                        id="direction1"
                        control={<Radio />}
                        label="Right"
                      />
                      <FormControlLabel
                        value={2}
                        name="direction"
                        id="direction2"
                        control={<Radio />}
                        label="Left"
                      />
                      {/* <FormControlLabel
                        value={3}
                        name="direction"
                        id="direction3"
                        control={<Radio />}
                        label="Top"
                      />

                      <FormControlLabel
                        value={4}
                        name="direction"
                        id="direction4"
                        control={<Radio />}
                        label="Bottom"
                      /> */}
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Announcements</Typography>
              </TableCell>
              <TableCell>
                <FormControl
                  component="fieldset"
                  sx={{ mt: 1, display: "flex" }}
                >
                  <RadioGroup
                    aria-label="adirection"
                    name="adirection"
                    value={announeDirection}
                    onChange={(event) => handleAnnounceChange(event)}
                    row
                  >
                    <FormControlLabel
                      value={1}
                      name="adirection"
                      id="adirection1"
                      control={<Radio />}
                      label="Top Right"
                    />
                    <FormControlLabel
                      value={2}
                      id="adirection2"
                      name="adirection"
                      control={<Radio />}
                      label="Top Left"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      id="adirection3"
                      name="adirection"
                      label="Bottom Right"
                    />

                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      id="adirection4"
                      name="adirection"
                      label="Bottom Left"
                    />
                  </RadioGroup>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Banner</Typography>
              </TableCell>
              <TableCell>
                {" "}
                <FormControl
                  component="fieldset"
                  sx={{ mt: 1, display: "flex" }}
                >
                  <RadioGroup
                    aria-label="direction"
                    name="bdirection"
                    value={bannerDirection}
                    onChange={(event) => handleBannerChange(event)}
                    row
                  >
                    <FormControlLabel
                      value={1}
                      id="bdirection1"
                      name="bdirection"
                      control={<Radio />}
                      label="Top Right"
                    />
                    <FormControlLabel
                      value={2}
                      id="bdirection2"
                      name="bdirection"
                      control={<Radio />}
                      label="Top Left"
                    />
                    <FormControlLabel
                      value={3}
                      id="bdirection3"
                      name="bdirection"
                      control={<Radio />}
                      label="Bottom Right"
                    />
                    <FormControlLabel
                      value={4}
                      id="bdirection4"
                      name="bdirection"
                      control={<Radio />}
                      label="Bottom Left"
                    />
                  </RadioGroup>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const mapStateToProps = ({ announcementReducer }) => {
  return {
    positionData: announcementReducer.positionData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getPosition: (payload) => {
      dispatch(actionType.getPosition(payload));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ArrangeLandingPage);
