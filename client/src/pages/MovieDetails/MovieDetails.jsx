// Hayes Meekins

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import styles from "./MovieDetails.module.css";

function MovieDetails() {
    const { tmdbId } = useParams();

    const [movie, setMovie] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState("");

    useEffect(() => {
        async function fetchMovie() {
            setLoading(true);
            setError("");

            try {
                const [movieResponse, reviewResponse] = await Promise.all([
                    fetch(`${API_URL}/api/tmdb/movie/${tmdbId}`),
                    fetch(`${API_URL}/api/reviews/tmdb/${tmdbId}`)
                ]);

                if (!movieResponse.ok || !reviewResponse.ok) {
                    throw new Error("Failed to load movie details");
                }

                const [movieData, reviews] = await Promise.all([
                    movieResponse.json(),
                    reviewResponse.json()
                ]);

                setMovie(movieData);
                setReviewData(reviews);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovie();
    }, [tmdbId]);

    async function handleReviewSubmit({ rating, comment }) {
        setSubmitting(true);
        setReviewError("");

        try {
            let movieId = reviewData?.movieId;

            if (!movieId) {
                const movieResponse = await fetch(`${API_URL}/api/movies`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    tmdbId: Number(tmdbId)
                    })
                });

                if (!movieResponse.ok) {
                    throw new Error("Failed to save movie");
                }

                const savedMovie = await movieResponse.json();
                movieId = savedMovie._id;
            }

            const response = await fetch(`${API_URL}/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    movie: movieId,
                    rating,
                    comment
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            const reviewResponse = await fetch(
                `${API_URL}/api/reviews/tmdb/${tmdbId}`
            );

            if (!reviewResponse.ok) {
                throw new Error("Review submitted, but failed to refresh reviews");
            }

            const updatedReviews = await reviewResponse.json();

            setReviewData(updatedReviews);
            setShowReviewForm(false);

        } catch (error) {
            setReviewError(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <p className={styles.message}>Loading movie...</p>;
    }

    if (error) {
        return <p className={styles.message}>{error}</p>;
    }

    if (!movie) {
        return <p className={styles.message}>Movie not found.</p>;
    }

    const posterUrl = movie.posterPath
        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
        : null;

    return (
        <section className={styles.details}>
            <div className={styles.movie}>
                <div className={styles.poster}>
                    {posterUrl ? (
                        <img src={posterUrl} alt={`${movie.title} poster`} />
                    ) : (
                        <div className={styles.placeholder}>
                            No Poster Available
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    <h1>{movie.title}</h1>

                    <div className={styles.metadata}>
                        <span>{movie.releaseYear}</span>

                        {movie.runtime != null && (
                            <span>{movie.runtime} min</span>
                        )}

                        {movie.genres?.length > 0 && (
                            <span>{movie.genres.join(", ")}</span>
                        )}
                    </div>

                    {movie.director && (
                        <p>
                            <strong>Director:</strong> {movie.director}
                        </p>
                    )}

                    {movie.cast?.length > 0 && (
                        <div className={styles.cast}>
                            <h2>Cast</h2>
                            <p>{movie.cast.join(", ")}</p>
                        </div>
                    )}

                    <div className={styles.overview}>
                        <h2>Overview</h2>
                        <p>
                            {movie.description ||
                                "No description available."}
                        </p>
                    </div>

                    <div className={styles.rating}>
                        <h2>FilmShelf Rating</h2>

                        {reviewData?.averageRating != null ? (
                            <p>
                                ★ {reviewData.averageRating.toFixed(1)} / 5
                                {" "}({reviewData.reviewAmount} reviews)
                            </p>
                        ) : (
                            <p>Not yet rated</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowReviewForm(true)}
                    >
                        Write a Review
                    </button>
                    {showReviewForm && (
                        <ReviewForm
                            movieTitle={movie.title}
                            onClose={() => setShowReviewForm(false)}
                            onSubmit={handleReviewSubmit}
                            submitting={submitting}
                            error={reviewError}
                        />
                    )}
                </div>
            </div>

            <div className={styles.reviews}>
                <h2>User Reviews</h2>

                {reviewData?.reviews.length > 0 ? (
                    reviewData.reviews.map((review) => (
                        <div key={review._id} className={styles.review}>
                            <p className={styles.reviewRating}>
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </p>

                            <p>{review.comment}</p>

                            <span className={styles.reviewDate}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>
        </section>
    );
}

export default MovieDetails;
