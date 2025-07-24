import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Views/Home/Home";

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home/>}/>
                    <Route path="test" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}