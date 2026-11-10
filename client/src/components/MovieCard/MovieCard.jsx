// Hayes Meekins

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
    const [inWatchlist, setInWatchlist] = useState(false);
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/movies/tmdb/${movie.id}`);
    };

    const handleWatchlist = () => {
        setInWatchlist(prev => !prev);
    }

    return (
        <article className={styles.movie}>
            <div className={styles.poster}>
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.placeholder}>
                        No Poster
                    </div>
                )}

                <div className={styles.overlay}>
                    <button type="button" onClick={handleDetails}>
                        Details
                    </button>

                    <button type="button" disabled>
                        Review
                    </button>

                    <button
                        type="button"
                        onClick={handleWatchlist}
                        aria-pressed={inWatchlist}
                    >
                        {inWatchlist
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"}
                    </button>
                </div>
            </div>

            <h3>{movie.title}</h3>
        </article>
    );
}

export default MovieCard;
