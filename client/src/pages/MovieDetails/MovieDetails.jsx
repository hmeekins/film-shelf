// Hayes Meekins

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import styles from "./MovieDetails.module.css";

function MovieDetails() {
    const { id, tmdbId } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovie() {
            setLoading(true);
            setError("");
            setMovie(null);

            const endpoint = tmdbId
                ? `${API_URL}/api/tmdb/movie/${tmdbId}`
                : `${API_URL}/api/movies/${id}`;

            try {
                const response = await fetch(endpoint, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Failed to load movie details");
                }

                const data = await response.json();
                setMovie(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchMovie();

        return () => controller.abort();
    }, [id, tmdbId]);

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
                </div>
            </div>
        </section>
    );
}

export default MovieDetails;
