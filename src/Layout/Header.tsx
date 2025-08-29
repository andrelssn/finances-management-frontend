import React from "react";
import { Button, Tab, Tabs } from "@mui/material";
import { logoutData } from "../Services/Services";

export default function Header() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <header
            className="w-full shadow-md"
            style={{ backgroundColor: "var(--panel)" }}
        >
            <div className="mx-auto px-6 py-4 flex items-left">
                <img />

                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { backgroundColor: "#3A9CFF" } }}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Tab 1" disableRipple />
                    <Tab label="Tab 2" disableRipple />
                    <Tab label="Tab 3" disableRipple />
                </Tabs>

                <Button onClick={() => logoutData('/auth/logout')}>
                    Logout
                </Button>
            </div>
        </header>
    );
}
