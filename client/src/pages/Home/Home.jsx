// Hayes Meekins

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import styles from "./Home.module.css";
import About from "../../components/About/About";
import Shelf from "../../components/Shelf/Shelf";

function Home() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMovies() {
            try {
                const response = await fetch(`${API_URL}/api/movies`);

                if (!response.ok) {
                    throw new Error("Failed to load movies");
                }

                const data = await response.json();
                setMovies(data.slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        }

        loadMovies();
    }, []);

    function handleMovieClick(movie) {
        navigate(`/movies/tmdb/${movie.tmdbId}`);
    }

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <About />
            </div>

            <div className={styles.content}>
                <Shelf
                    movies={movies}
                    movieBehaviour={handleMovieClick}
                />
            </div>
        </div>
    );
}

export default Home;
