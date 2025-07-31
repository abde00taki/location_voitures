import React, { useState } from "react";
import {
    Box,
    IconButton,
    Badge,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { IoCarSportOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { BiSolidMessageRoundedX, BiSolidMessageSquareX } from "react-icons/bi";
import Profile from "../pages/Profile";
import { NavLink } from "react-router-dom";

export default function PrimarySearchSidebar(props) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            sx={{
                width: 250,
                backgroundColor: "#212529",
                color: "white",
                height: "100%",
            }}
            role="presentation"
            onClick={toggleDrawer}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <IoCarSportOutline size={30} color="orange" />
                <Typography variant="h6" ml={1}>
                    TAKICARS
                </Typography>
            </Box>

            <List>
                <ListItem>
                    <ListItemIcon button  onClick={props.handleClearNotifications} >
                        <Badge badgeContent={props.pendingCount} color="error">
                            <MailIcon sx={{ color: "white" }} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItem>

                <ListItem button onClick={props.changeRefuse}>
                    <ListItemIcon>
                        <BiSolidMessageRoundedX color="white" />
                    </ListItemIcon>
                    <ListItemText primary="Refused Reservations" />
                </ListItem>

                <ListItem button onClick={props.changeAccept}>
                    <ListItemIcon>
                        <GrValidate color="white" />
                    </ListItemIcon>
                    <ListItemText primary="Accepted Reservations" />
                </ListItem>

                <ListItem button onClick={props.changeDrop}>
                    <ListItemIcon>
                        <BiSolidMessageSquareX color="white" />
                    </ListItemIcon>
                    <ListItemText primary="Dropped Reservations" />
                </ListItem>

                <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />

                <ListItem component="a" href="http://localhost:5173/" target="_blank">
                    <ListItemIcon>
                        <FaEye color="white" />
                    </ListItemIcon>
                    <ListItemText className="text-light" primary="View Site" />
                </ListItem>

                <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />

                <ListItem>
                    <ListItemIcon>
                        <NavLink to={'/profile'}><AccountCircle sx={{ color: "white" }} /></NavLink>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>

            </List>
        </Box>
    );

    return (
        <>
            {/* Icon to open sidebar - appears only on small screens */}
            <Box sx={{ display: { xs: "flex", md: "none" }, p: 1 }}>
                <IconButton
                    color="inherit"
                    edge="start"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    className="position-fixed mx-3"
                    sx={{ backgroundColor: "#212529", color: "white", zIndex: "999" }}
                >
                    <MenuIcon /> 
                </IconButton>
            </Box>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 250,
                    },
                }}
            >
                {drawer}
            </Drawer>

            
        </>
    );
}
