// Hayes Meekins

import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import Shelf from "../../components/Shelf/Shelf";
import styles from "./MyMovies.module.css";

function MyMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleMovieClick(movie) {
        navigate(`/movies/tmdb/${movie.tmdbId}`);
    }

    useEffect(() => {
        async function loadMovies() {
            try {
                const response = await fetch(`${API_URL}/api/movies`);

                if (!response.ok) {
                    throw new Error("Failed to load movies");
                }

                const data = await response.json();
                setMovies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, []);

    if (loading) {
        return <p>Loading movies...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (movies.length === 0) {
        return <p>No movies yet.</p>;
    }

    return (
        <div className={styles.myMovies}>
            <h1 className={styles.heading}>My Collection</h1>
            <Shelf
                movies={movies}
                movieBehaviour={handleMovieClick}
            />
        </div>
    );
}

export default MyMovies;