import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

// Components
import Login from "../Views/Login/Login";
import HeaderAuth from "../Layout/HeaderAuth";
import Header from "../Layout/Header";
import userAuthData from "../Components/GlobalState/User";
import Home from "../Views/Home/Home";
import Register from "../Views/Register/Register";

// Types
import type { SnackbarState } from "../Components/MySnackbar/MySnackbar";
import MonthlyExpenses from "../Views/MonthlyExpenses/MonthlyExpenses";
import Panel from "../Views/Panel/Panel";

export type MainRouterTypes = {
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
    reloadCheck: () => void;
};

export default function MainRouter({ setSnackbar, reloadCheck } : MainRouterTypes) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const user = userAuthData((state) => state.user);

    return (
        <BrowserRouter>
            <Routes>
                { user ? (
                    <Route
                        path="/"
                        element={<Header reloadCheck={reloadCheck} setSnackbar={setSnackbar} isMobile={isMobile}/>}
                    >
                        <Route index element={<Panel/>}/>
                        <Route path="/monthly-expenses" element={<MonthlyExpenses/>}/>
                    </Route>
                ) : (
                    <Route
                        path="/"
                        element={<HeaderAuth/>}
                    >
                        <Route index element={<Home/>}/>
                        <Route path="*" element={<Navigate to="/" replace />}/>
                    </Route>
                )}

                <Route element={user ? <Navigate to="/" replace /> : <HeaderAuth/>} >
                    <Route
                        path="/auth/login"
                        element={<Login setSnackbar={setSnackbar} reloadCheck={reloadCheck} />}
                    />

                    <Route
                        path="/auth/register"
                        element={<Register setSnackbar={setSnackbar} reloadCheck={reloadCheck} />}
                    />
                </Route>


                {/* <Route path="*" element={<Page404/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}