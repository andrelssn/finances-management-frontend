import React from "react";
import { Button} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';

export default function HeaderAuth() {
    const path = window.location.pathname;

    return (
        <React.Fragment>
            <header
                className="flex w-full shadow-md h-20 items-center"
                style={{ backgroundColor: "var(--panel)" }}
            >
                <div className="ml-5">
                    <Link to={'/'}>
                        <Button disableTouchRipple className={ path === '/' ? 'header-button-current' : "header-button"} startIcon={<HomeIcon/>}>
                            Início
                        </Button>
                    </Link>
                </div>
            </header>

            <Outlet/>
        </React.Fragment>
    );
}
