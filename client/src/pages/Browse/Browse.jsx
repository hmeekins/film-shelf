// Hayes Meekins

import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import Search from "../../components/Search/Search";
import styles from "./Browse.module.css";

function Browse() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch(query) {
        setPage(1);
        setSearchQuery(query);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            setLoading(true);
            setError("");

            try {
                const endpoint = searchQuery
                    ? `${API_URL}/api/tmdb/search?query=${encodeURIComponent(searchQuery)}&page=${page}`
                    : `${API_URL}/api/tmdb/popular?page=${page}`;

                const response = await fetch(endpoint, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }

                const data = await response.json();

                setMovies(data.results ?? []);
                setTotalPages(data.total_pages ?? 1);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchMovies();

        return () => controller.abort();
    }, [page, searchQuery]);

    return (
        <section className={styles.browse}>
            <h1>Browse Movies</h1>
            <Search onSearch={handleSearch} />

            {loading && <p>Loading movies...</p>}
            {error && <p role="alert">{error}</p>}

            {!loading && !error && (
                <>
                    <div className={styles.grid}>
                        {movies.map((movie) => (
                            <div key={movie.id} className={styles.movie}>
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

                                <h3>{movie.title}</h3>
                            </div>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Browse;
