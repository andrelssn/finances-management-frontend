import React from "react";
import { Box, Divider, Drawer, IconButton, List, ListItemButton, Tab, Tabs, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Img
import logo from '../../Images/FinancesLogo.png';
import profile from '../../Images/profile/profile-default.png';

// Style
import "./Style.css";

// Components
import { tabsSx, tabsSxMain } from "../../Components/Styles/TabsSx";
import { CustomMenu, CustomMenuItem } from "../../Components/MenuStyled/MenuStyled";

// State Components
import userAuthData from "../../Components/States/UserState";

// Modal
import ModalProfile from "./ModalProfile/ModalProfile";

// Services
import { logoutData } from "../../Services/services";

export default function Header(props) {
    const {
        isMobile,
        setReload,
        setSnackbar
    } = props;

    const userData = userAuthData((state) => state.user);

    const [anchorEl, setAnchorEl]   = React.useState(null);
    const [tabValue, setTabValue]   = React.useState(0);
    const [open, setOpen]           = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const openMenu                  = Boolean(anchorEl);
    const handleOpenModal           = () => setOpenModal(true);
    const handleCloseModal          = () => setOpenModal(false);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    async function logoutUser() {
        await logoutData("/auth/logout").then(response => {
            if (response.status === 200) {
                setReload(Math.random());
            }
        });
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItemButton href="/">
                    Painel Principal
                </ListItemButton>
            </List>
        </Box>
    );

    if (isMobile) {
        return (
            <header className="header-mobile">
                <Box sx={{ position: "absolute", left: 5 }}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>

                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Box>

                <div>
                    <img
                        alt="finances-logo"
                        src={logo}
                        style={{ width: 100 }}
                    />
                </div>
            </header>
        )
    }

    return (
        <React.Fragment>
            <header className="header">
                <div>
                    <img
                        alt="finances-logo"
                        src={logo}
                        style={{ width: 100 }}
                    />
                </div>

                <Box display={"flex"}>
                    <Tabs value={tabValue} onChange={handleChangeTab} sx={tabsSxMain}>
                        <Tab label="Painel Principal" sx={tabsSx}/>
                    </Tabs>

                    <IconButton onClick={handleClickMenu} sx={{ ml: 3 }}>
                        <img
                            alt="finances-logo"
                            src={profile}
                            style={{ width: 30 }}
                        />
                    </IconButton>

                    <CustomMenu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <Typography textAlign={"center"} fontWeight={"bold"} color="var(--text)">
                            {userData.name}
                        </Typography>

                        <Divider sx={{ m: "10px 0px" }}/>

                        <CustomMenuItem onClick={() => {handleCloseMenu(); handleOpenModal();}}>
                            <AccountCircleIcon style={{ fontSize: 18, marginRight: 5 }}/>
                            Meu Perfil
                        </CustomMenuItem>

                        <CustomMenuItem onClick={() => logoutUser()}>
                            <LogoutIcon style={{ fontSize: 18, marginRight: 5 }}/>
                            Logout
                        </CustomMenuItem>
                    </CustomMenu>
                </Box>

                <ModalProfile openModal={openModal} handleCloseModal={handleCloseModal} userData={userData} setReload={setReload} setSnackbar={setSnackbar}/>
            </header>

            <Outlet/>
        </React.Fragment>
    );
}