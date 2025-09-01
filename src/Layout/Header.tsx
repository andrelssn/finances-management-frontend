import React from "react";
import { Box, Button,Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { logoutData } from "../Services/Services";
import { Link, Outlet } from "react-router-dom";

// Icons & img
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../Images/finances.png';

// Components
import type { SnackbarState } from "../Components/MySnackbar/MySnackbar";
import { HeaderRoutes } from "./HeaderRoutes/HeaderRoutes";
import userAuthData from "../Components/GlobalState/User";

type HeaderTypes = {
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
    reloadCheck: () => void;
    isMobile: boolean;
};

export default function Header({ reloadCheck, setSnackbar, isMobile }: HeaderTypes) {
    const user = userAuthData((state) => state.user);

    const [path, setPath]             = React.useState('/');
    const [recall, setRecall]         = React.useState(1);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const mobile = isMobile;

    React.useEffect(() => {
        setPath(window.location.pathname);
    }, [recall]);

    const logoutUser = () => {
        logoutData('/auth/logout');
        reloadCheck();
        setSnackbar({ open: true, severity: "success", message: `Deslogado com Sucesso!` });
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, bgcolor: "var(--panel)", height: "100dvh" }} role="presentation" onClick={toggleDrawer(false)}>
            <List key={path}>
                {HeaderRoutes.map((data, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => setRecall(recall + 1)} sx={ path === data.path ? { bgcolor: "var(--background)" } : {} }>
                            <Link to={data.path} style={{ width: "100%", display: "flex", alignItems: "center", color: "var(--text)" }}>
                                <ListItemIcon sx={{ color: "var(--text)" }}>
                                    <data.icon/>
                                </ListItemIcon>

                                <ListItemText primary={data.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>

            <div className="absolute bottom-5 ml-2 flex items-center gap-2">
                <IconButton className="header-logout" onClick={() => logoutUser()}>
                    <LogoutIcon sx={{ fontSize: 21 }}/>
                </IconButton>

                <Typography className="header-username">
                    {user?.name}
                </Typography>
            </div>
        </Box>
    );

    if (mobile) return (
        <React.Fragment>
            <header
                className="flex flex-col relative w-full shadow-md"
                style={{ backgroundColor: "var(--panel)" }}
            >
                <div className="flex items-center p-3">
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon sx={{ color: "var(--text)" }}/>
                    </IconButton>

                    <img src={logo} alt="finance$" width={120} className="ml-5"/>
                </div>

                <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </header>

            <Outlet/>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <header
                className="flex flex-col relative w-full shadow-md"
                style={{ backgroundColor: "var(--panel)" }}
            >
                <div className="flex items-center p-3 justify-between">
                    <img src={logo} alt="finance$" width={120}/>

                    <div className="flex items-center gap-2">
                        <Typography className="header-username">
                            {user?.name}
                        </Typography>

                        <IconButton className="header-logout" onClick={() => logoutUser()}>
                            <LogoutIcon sx={{ fontSize: 21 }}/>
                        </IconButton>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid var(--background)" }} className="flex items-left gap-3 border-b-2 border-b-[var(--background)] h-fit pl-3 pt-1">
                    { HeaderRoutes.map((data) => {
                        return (
                            <Link to={data.path}>
                                <Button
                                    onClick={() => setRecall(recall + 1)}
                                    disableTouchRipple
                                    className={ path === data.path ? 'header-button-current' : "header-button"}
                                    startIcon={<data.icon/>}
                                >
                                    {data.name}
                                </Button>
                            </Link>
                        )
                    })}
                </div>
            </header>

            <Outlet/>
        </React.Fragment>
    );
}
