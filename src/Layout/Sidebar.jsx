import { Menu } from "antd";
import * as React from "react";
import Sider from "antd/es/layout/Sider";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import appDrawerWidth from "../Utils/constant";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useMediaQuery, Box, Divider } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Link as RouterLink, useNavigate } from "react-router-dom";
function Sidebar(props) {
    const { window, open, handleDrawerToggle } = props;
    const theme = useTheme();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const onClickGoPage = (e) => {
        if (e.key === "/maill-app") {
            return navigate("/maill-app");
        }
        navigate(e.key);
    };
    const items = [
        {
            label: "Mijozlar",
            key: "/",
            icon: <PeopleOutlineIcon style={{ fontSize: "20px" }} />,
        },
         {
            label: "Xodimlar",
            key: "/users",
            icon: <PeopleOutlineIcon style={{ fontSize: "20px" }} />,
        },
    ];

    const drawer = (
        <Box>
            <Toolbar>
                <Link
                    to="/"
                    component={RouterLink}
                    sx={{ display: "contents" }}
                >
                   My.teacher logo
                </Link>
            </Toolbar>
            <Divider />
            <Sider
                width={239}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                trigger={null}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["/"]}
                    onClick={onClickGoPage}
                    style={{
                        height: "100%",
                        borderRight: 0,
                    }}
                    items={items}
                />
            </Sider>
            <Divider />
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <CssBaseline />
            <Box
                component="nav"
                sx={{
                    width: { md: open && appDrawerWidth },
                    flexShrink: { md: 0 },
                    zIndex: 1300,
                }}
                aria-label="mailbox folders"
            >
                {!matchDownMD ? (
                    <Drawer
                        open={open}
                        variant="persistent"
                        onClose={handleDrawerToggle}
                        sx={{
                            display: { xs: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: appDrawerWidth,
                                zIndex: "14 !important",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                ) : (
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: appDrawerWidth,
                                borderRight: `1px solid ${theme.palette.divider}`,
                                backgroundImage: "none",
                                boxShadow: "inherit",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>
        </Box>
    );
}

export default Sidebar;