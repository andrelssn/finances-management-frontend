import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Views/Home/Home";
import Header from "./Layout/Header";
import Page404 from "../Views/404/Page404";

export default function MainRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Header isMobile={props.isMobile} userData={props.userData}/>}
                >
                    <Route index element={<Home/>}/>
                    <Route path="test" element={<Home/>}/>
                </Route>

                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    );
}