import React from "react";
import { Box, Drawer, IconButton, List, ListItemButton, Tab, Tabs } from "@mui/material";

// IMG & Icons
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../Images/FinancesLogo.png';

// Style
import "./Style.css";

// Components
import { tabsSx, tabsSxMain } from "../../Components/Styles/TabsSx";
import { logoutData } from "../../Services/services";

export default function Header(props) {
    const {
        isMobile
    } = props;

    const [tabValue, setTabValue] = React.useState(0);
    const [open, setOpen]         = React.useState(false);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    async function logoutUser() {
        await logoutData("/auth/logout").then(response => {
            if (response.status === 200) {
                window.location.reload();
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
        <header className="header">
            <div>
                <img
                    alt="finances-logo"
                    src={logo}
                    style={{ width: 100 }}
                />
            </div>

            <Box>
                <Tabs value={tabValue} onChange={handleChangeTab} sx={tabsSxMain}>
                    <Tab label="Painel Principal" sx={tabsSx}/>
                    <Tab label="Perfil" sx={tabsSx}/>
                </Tabs>

                <IconButton onClick={() => logoutUser()}>
                    Profile
                </IconButton>
            </Box>
        </header>
    );
}