import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";
import { IoCarSportOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Profile from "../pages/Profile";
import { GrValidate } from "react-icons/gr";
import { BiSolidMessageRoundedX } from "react-icons/bi";

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
//   const [pendingCount, setPendingCount] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // 🟢 جلب عدد الـ pending
//   const fetchPendingCount = () => {
//     axios.get("http://localhost:8888/rent")
//       .then(res => {
//         const count = res.data.filter(r => r.status === "pending").length;
//         setPendingCount(count);
//       })
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchPendingCount();
//     const interval = setInterval(fetchPendingCount, 10000); // كل 10 ثواني
//     return () => clearInterval(interval);
//   }, []);

//   const handleClearNotifications = () => {
//     setPendingCount(0);
//   };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="pending reservations" color="inherit" onClick={props.handleClearNotifications}>
          <Badge badgeContent={props.pendingCount} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ width: '100%', margin: 0, padding: 0 }} className="sticky-top">
        <AppBar
          sx={{
            backgroundColor: '#212529',
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <Toolbar sx={{ width: '100%' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <IoCarSportOutline className="fs-1" /> LOCATION
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              
              <IconButton size="large" aria-label="pending reservations" color="inherit" onClick={props.handleClearNotifications}>
                <Badge badgeContent={props.pendingCount} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" onClick={props.changeRefuse} aria-label="refuse reservations" color="inherit">
                <BiSolidMessageRoundedX />
              </IconButton>

              <IconButton size="large" onClick={props.changeAccept} aria-label="accept reservations" color="inherit">
                <GrValidate />
              </IconButton>

              <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">
                <IconButton size="large" aria-label="view site" color="inherit">
                  <FaEye color="white" />
                </IconButton>
              </a>

              <IconButton
                size="large"
                edge="end"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Profile
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Profile />
        </div>
      </div>
    </>
  );
}
