//Hayes Meekins
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp"
import MyMovies from "./pages/MyMovies/MyMovies"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/movies" element={<MyMovies />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;