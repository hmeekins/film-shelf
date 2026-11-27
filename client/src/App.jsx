// Hayes Meekins

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import MyMovies from "./pages/MyMovies/MyMovies";
import Auth from "./pages/Auth/Auth";
import Browse from "./pages/Browse/Browse";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Account from "./pages/Account/Account";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<MyMovies />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/movies/tmdb/:tmdbId" element={<MovieDetails />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/change-password" element={<ChangePassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;