// Hayes Meekins

async function getPopularMovies(page = 1) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json"
            }
        }
    );

    if (!response.ok) {
        const error = new Error("Failed to fetch popular movies from TMDB");
        error.status = 502;
        throw error;
    }

    const data = await response.json();

    return data;
}

async function getTmdbMovie(tmdbId) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json"
            }
        }
    );

    if (!response.ok) {
        const error = new Error("Failed to fetch movie from TMDB");
        error.status = response.status === 404 ? 404 : 502;
        throw error;
    }

    const data = await response.json();

    if (!data.title || !data.release_date) {
        const error = new Error("TMDB movie is missing required information");
        error.status = 422;
        throw error;
    }

    return {
        title: data.title,
        releaseYear: Number(data.release_date.slice(0, 4)),
        genres: data.genres?.map(genre => genre.name) || [],
        description: data.overview || "",
        tmdbId: data.id,
        posterPath: data.poster_path || ""
    };
}

async function searchMovies(query, page = 1) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json"
            }
        }
    );

    if (!response.ok) {
        const error = new Error("Failed to search movies on TMDB");
        error.status = 502;
        throw error;
    }

    const data = await response.json();

    return data;
}

module.exports = { 
    getPopularMovies,
    getTmdbMovie,
    searchMovies
};