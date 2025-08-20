import { BrowserRouter, Route, Routes } from "react-router-dom";

import Panel from "../Views/Panel/Panel";
import Header from "./Layout/Header";
import Page404 from "../Views/404/Page404";

export default function MainRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Header {...props}/>}
                >
                    <Route index element={<Panel {...props}/>}/>
                </Route>

                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    );
}