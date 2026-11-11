// Hayes Meekins

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitReview } from "../../services/reviewService";
import ReviewPanel from "../ReviewForm/ReviewForm";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
    const [inWatchlist, setInWatchlist] = useState(false);
    const [showReviewPanel, setShowReviewPanel] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState("");

    const navigate = useNavigate();

    const handleWatchlist = () => {
        setInWatchlist(prev => !prev);
    };

    async function handleReviewSubmit({ rating, comment }) {
        setSubmitting(true);
        setReviewError("");

        try {
            await submitReview(movie.id, rating, comment);
            setShowReviewPanel(false);
        } catch (error) {
            setReviewError(error.message);
        } finally {
            setSubmitting(false);
        }
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
                    <button type="button" onClick={() => navigate(`/movies/tmdb/${movie.id}`)}>
                        Details
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setReviewError("");
                            setShowReviewPanel(true);
                        }}
                    >
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

            {showReviewPanel && (
                <ReviewPanel
                    movieTitle={movie.title}
                    onClose={() => setShowReviewPanel(false)}
                    onSubmit={handleReviewSubmit}
                    submitting={submitting}
                    error={reviewError}
                />
            )}
        </article>
    );
}

export default MovieCard;
