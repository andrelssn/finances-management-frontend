import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useMediaQuery, useTheme } from "@mui/material";

// Components
import Login from "../Views/Login/Login";
import Header from "../Layout/Header";

// Types
import type { SnackbarState } from "../Components/MySnackbar/MySnackbar";
import React from "react";
import userAuthData from "../Components/GlobalState/User";
import Home from "../Views/Home/Home";

export type MainRouterTypes = {
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
    reloadCheck: () => void;
};

export default function MainRouter({ setSnackbar, reloadCheck } : MainRouterTypes) {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const user = userAuthData((state) => state.user);

    React.useEffect(() => {
        console.log(user);
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Header/>}
                >
                    <Route index element={<Home/>}/>
                </Route>

                <Route
                    path="/auth"
                    element={user ? <Navigate to="/" replace /> : <Login setSnackbar={setSnackbar} reloadCheck={reloadCheck} />}
                />

                {/* <Route path="*" element={<Page404/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}