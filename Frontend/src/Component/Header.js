import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddIcon from "@mui/icons-material/Add";
import PolicyIcon from "@mui/icons-material/Policy";
import logo from "../images/logo3.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const jwtToken = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    console.log("JwtToken from Header", jwtToken);
  });

  return (
    <AppBar
      position="static"
      // sx={{ backgroundColor: "#3AA6B9", height: "70px" }}
      sx={{ backgroundColor: "#068DA9", height: "70px" }}
    >
      <Toolbar>
        <Box>
          <img src={logo} height="70px" width="250px" />
        </Box>
        {jwtToken ? (
          <>
            <Button
              style={{ marginLeft: 30, marginRight: 40 }}
              color="inherit"
              component={Link}
              to="/arrange"
            >
              <IconButton color="inherit" style={{ marginRight: 1 }}>
                <MenuIcon />
              </IconButton>
              Arrange{" "}
            </Button>
            <Button
              style={{ marginRight: 40 }}
              color="inherit"
              component={Link}
              to="/approve"
            >
              <IconButton color="inherit" style={{ marginRight: 1 }}>
                <VerifiedIcon />
              </IconButton>
              Approve
            </Button>
            <Button
              style={{ marginRight: 40 }}
              color="inherit"
              component={Link}
              to="/add"
            >
              <IconButton color="inherit" style={{ marginRight: 1 }}>
                <AddIcon />
              </IconButton>
              Add Admins
            </Button>
            <Button
              style={{ marginRight: 40 }}
              color="inherit"
              component={Link}
              to="/policies"
            >
              <IconButton color="inherit" style={{ marginRight: 1 }}>
                <PolicyIcon />
              </IconButton>
              Policies
            </Button>
          </>
        ) : null}

        <div style={{ flexGrow: 1 }} />
        {jwtToken ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
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
              <MenuItem onClick={handleClose}>View Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : <>
        <Stack direction="row" spacing={3}>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/registration");
            }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Stack></>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
