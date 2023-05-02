import {
    Box,
    Link,
    Menu,
    AppBar,
    Avatar,
    Divider,
    Toolbar,
    MenuItem,
    IconButton,
    Typography,
    ListItemIcon,
} from "@mui/material";
import * as React from "react";
import useToken from "../Hooks/UseToken";
import appDrawerWidth from "../Utils/constant";
import Logout from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export default function Header(props) {
    const { handleDrawerToggle, open } = props;
    const { token } = useToken();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const appWidth = open ? appDrawerWidth : 0;
    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

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
    const handleLogOut = () => {
        if (sessionStorage.getItem("bank-audit-admin"))
            sessionStorage.removeItem("bank-audit-admin", token);
        if (localStorage.getItem("profile"))
            localStorage.removeItem("profile", token);
        if (localStorage.getItem("bank-audit-admin")) {
            localStorage.removeItem("bank-audit-admin", token);
        }
        localStorage.clear();
        window.location.href = "/login";
    };
    const handleLogoutChange = () => {
        handleLogOut();
        handleMenuClose();
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: { xs: 26, md: 20 },
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Link
                to={"/profile"}
                component={RouterLink}
                variant="subtitle6"
                style={{ color: "unset", display: "contents" }}
            >
                <MenuItem>
                    <Avatar />
                    Profile
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogoutChange} sx={{ color: "red" }}>
                <ListItemIcon>
                    <Logout sx={{ color: "red" }} fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflowY: "visible",
                    overflowX: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    height: "250px",
                    width: "280px",
                    padding: "5px",
                    borderRadius: "10px",
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: "5%",
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem>
               <Typography>Nima bo'lishi kerak edi?</Typography>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: "12 !important",
                    backgroundColor: "#001529",
                    padding: "8px 0 !important",
                    boxShadow: "0px 3px 10px 3px #757575",
                    ml: { md: `${appWidth}px` },
                    width: {
                        md: `calc(100% - ${appWidth}px)`,
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            mr: 2,
                            fontSize: "1.7rem",
                        }}
                        onClick={handleDrawerToggle}
                    >
                        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Myteacher
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-haspopup="true"
                            aria-label="show more"
                            sx={{ padding: "6px" }}
                            aria-controls={mobileMenuId}
                            onClick={handleMobileMenuOpen}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
