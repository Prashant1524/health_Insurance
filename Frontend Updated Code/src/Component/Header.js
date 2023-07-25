import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import AddIcon from "@mui/icons-material/Add";
import PolicyIcon from "@mui/icons-material/Policy";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import logo from "../images/logonew.png";
import "../styles/style.css";
import { useSelector, useDispatch, connect } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import * as actionType from "../redux-saga/actions";
import jwt from "jwt-decode";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InfoIcon from "@mui/icons-material/Info";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Login from "./Login";

const Navbar = (props) => {
  const { actions, positionData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const jwtToken = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState(null);
  const open = Boolean(anchorEl);
  const [anchor, setAnchor] = useState("left");
  const userData = useSelector((state) => state.reducerUser.userData);
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const posList = useSelector(
    (state) => state.announcementReducer.positionData
  );
  const [pos, setPos] = useState(posList);
  const [menuPos, setMenuPos] = useState("left");

  const drawerWidth = 240;
  const userNavItems = [
    {
      name: "View Plans",
      icon: <PolicyIcon />,
      link: "/policies",
    },
    {
      name: "My Policies",
      icon: <ViewComfyAltIcon />,
      link: "/userplans",
    },

    {
      name: "View Profile",
      icon: <PersonOutlineIcon />,
      link: "/profile",
    },
    {
      name: "Contact Us",
      icon: <ContactSupportIcon />,
      link: "/contact",
    },
  ];
  const adminNavItems = [
    {
      name: "Arrange Position",
      icon: <FindReplaceIcon />,
      link: "/arrange",
    },
    {
      name: "Add Admins",
      icon: <AddIcon />,
      link: "/add",
    },
    {
      name: "Manage Users",
      icon: <ManageAccountsIcon />,
      link: "/userlist",
    },
    {
      name: "Add Plans/Policy",
      icon: <AddCircleIcon />,
      link: "/addplans",
    },
    {
      name: "View Plans",
      icon: <PolicyIcon />,
      link: "/policies",
    },
    {
      name: "Approve Testimonial",
      icon: <VerifiedIcon />,
      link: "/approve",
    },
    {
      name: "Add Announcements",
      icon: <AnnouncementIcon />,
      link: "/announcements",
    },
  ];

  useEffect(() => {
    if (!positionData) {
      dispatch(actionType.getPosition({ jwtToken }));
    }
  }, [positionData]);

  useEffect(() => {
    if (positionData != null) {
      const menubar = positionData.filter(
        (pos) => pos.positionName === "Menubar"
      );
      if (menubar[0].positionValue === 1) {
        setMenuPos("right");
      } else {
        setMenuPos("left");
      }
    }
  }, [positionData]);

  const handleMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseDrawer = () => {
    setOpenMenu(null);
  };
  const drawer = (
    <Box sx={{ textAlign: "center", minWidth: "220px" }}>
      <Box
        height="70px"
        sx={{ paddingTop: "10px", backgroundColor: "#068DA9" }}
      >
        <img src={logo} height="50px" alt="logo" />
      </Box>
      <Divider />
      <List>
        {role === "ROLE_USER"
          ? userNavItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link to={item.link} onClick={handleCloseDrawer}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton sx={{ color: "#E55807" }}>
                        {item.icon}
                      </IconButton>
                      <ListItemText
                        primary={item.name}
                        sx={{ color: "#7E1717" }}
                      />
                    </Stack>
                  </Link>
                </ListItemButton>
                <Divider />
              </ListItem>
            ))
          : adminNavItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link to={item.link} onClick={handleCloseDrawer}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton sx={{ color: "#E55807" }}>
                        {item.icon}
                      </IconButton>
                      <ListItemText
                        primary={item.name}
                        sx={{ color: "#7E1717" }}
                      />
                    </Stack>
                  </Link>
                </ListItemButton>
                <Divider />
              </ListItem>
            ))}
      </List>
    </Box>
  );
  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    setAnchorEl(null);
    localStorage.removeItem("token");
    localStorage.clear();
    actions.resetUserMsg();
  };

  const handleProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userData && userData.length != 0) {
      console.log("User Data from Header after forgot passowrd", userData);
      setRole(userData[0].roles[0].name);
    } else if (jwtToken) {
      const user = jwt(jwtToken);
      dispatch(actionType.getUserDetails({ email: user.sub }));
    }
  }, [userData]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="static"
        sx={{ backgroundColor: "#068DA9", height: "80px" }}
      >
        <Toolbar>
          {jwtToken &&
            location.pathname !== "/login" &&
            location.pathname !== "/registration" && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
            )}

          <Box>
            <img src={logo} height="50px" width="160px" alt="logo" />
          </Box>

          <div style={{ flexGrow: 1 }} />
          <Box sx={{ marginRight: "20px" }}>
            <Link className="align-center" to="/">
              <HomeIcon />
              <Typography align="center">Homepage</Typography>
            </Link>
          </Box>
          {jwtToken &&
          location.pathname !== "/login" &&
          location.pathname !== "/registration" ? (
            <>
              <Link className="align-center" onClick={handleProfileMenu}>
                <AccountCircleIcon />
                <Typography align="center">
                  {userData != null
                    ? userData[0].firstname + " " + userData[0].lastname
                    : "My Profile"}
                </Typography>
              </Link>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>View Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Stack direction="row" spacing={3}>
                <Link className="align-center" to="/registration">
                  <AppRegistrationIcon />
                  <Typography>User Registration</Typography>
                </Link>
                <Link className="align-center" to="/admin-login">
                  <LoginIcon />
                  <Typography>Admin Login</Typography>
                </Link>

                <Link className="align-center" to="/login">
                  <LoginIcon />
                  <Typography align="center">User Login</Typography>
                </Link>
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ backgroundColor: "#068DA9" }}>
        <Drawer anchor={menuPos} open={openMenu} onClose={handleCloseDrawer}>
          {drawer}
        </Drawer>
      </Box>
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
    resetUserMsg : ()=>{
      dispatch(actionType.resetUserMsgLogout());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
