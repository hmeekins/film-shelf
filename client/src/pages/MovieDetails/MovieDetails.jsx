// Hayes Meekins

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import { submitReview } from "../../services/reviewService";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import styles from "./MovieDetails.module.css";

function MovieDetails() {
    const { tmdbId } = useParams();

    const [movie, setMovie] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
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

    async function refreshReviews() {
        const response = await fetch(
            `${API_URL}/api/reviews/tmdb/${tmdbId}`
        );

        if (!response.ok) {
            throw new Error("Failed to refresh reviews");
        }

        const updatedReviews = await response.json();
        setReviewData(updatedReviews);
    }

    async function handleReviewSubmit({ rating, comment }) {
        setSubmitting(true);
        setReviewError("");

        try {
            await submitReview(tmdbId, rating, comment);
            await refreshReviews();

            setShowReviewForm(false);
        } catch (error) {
            setReviewError(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleEditReview({ rating, comment }) {
        setSubmitting(true);
        setReviewError("");

        try {
            const response = await fetch(
                `${API_URL}/api/reviews/${editingReview._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ rating, comment })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update review");
            }

            await refreshReviews();
            setEditingReview(null);
        } catch (error) {
            setReviewError(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDeleteReview() {
        const myReview = reviewData?.reviews?.[0];

        if (!myReview) {
            return;
        }

        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }

        setSubmitting(true);
        setReviewError("");

        try {
            const response = await fetch(
                `${API_URL}/api/reviews/${myReview._id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete review");
            }

            await refreshReviews();
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

    const myReview = reviewData?.reviews?.[0] ?? null;

    const posterUrl = movie.posterPath
        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
        : null;

    return (
        <section className={styles.details}>
            <div className={styles.movie}>
                <div className={styles.poster}>
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={`${movie.title} poster`}
                        />
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
                        onClick={() => {
                            setReviewError("");
                            setShowReviewForm(true);
                        }}
                    >
                        Write a Review
                    </button>
                </div>
            </div>

            {myReview && (
                <div className={styles.myReview}>
                    <h2>My Review</h2>

                    <p className={styles.reviewRating}>
                        {"★".repeat(myReview.rating)}
                        {"☆".repeat(5 - myReview.rating)}
                    </p>

                    <p>{myReview.comment}</p>

                    <div className={styles.reviewActions}>
                        <button
                            type="button"
                            disabled={submitting}
                            onClick={() => {
                                setReviewError("");
                                setEditingReview(myReview);
                            }}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            disabled={submitting}
                            onClick={handleDeleteReview}
                        >
                            Delete
                        </button>
                    </div>

                    {reviewError && !editingReview && !showReviewForm && (
                        <p>{reviewError}</p>
                    )}
                </div>
            )}

            <div className={styles.reviews}>
                <h2>User Reviews</h2>

                {reviewData?.reviews?.length > 0 ? (
                    reviewData.reviews.map((review) => (
                        <div
                            key={review._id}
                            className={styles.review}
                        >
                            <p className={styles.reviewRating}>
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </p>

                            <p>{review.comment}</p>

                            <span className={styles.reviewDate}>
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>

            {showReviewForm && (
                <ReviewForm
                    movieTitle={movie.title}
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={handleReviewSubmit}
                    submitting={submitting}
                    error={reviewError}
                />
            )}

            {editingReview && (
                <ReviewForm
                    key={editingReview._id}
                    movieTitle={movie.title}
                    review={editingReview}
                    onClose={() => setEditingReview(null)}
                    onSubmit={handleEditReview}
                    submitting={submitting}
                    error={reviewError}
                />
            )}
        </section>
    );
}

export default MovieDetails;
