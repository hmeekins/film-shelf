// Hayes Meekins
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import MyMovies from "./pages/MyMovies/MyMovies";
import SignUp from "./pages/SignUp/SignUp";
import Browse from "./pages/Browse/Browse";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<MyMovies />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/browse" element={<Browse />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;