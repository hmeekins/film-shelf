// Hayes Meekins

import { API_URL } from "../config";

export async function submitReview(tmdbId, rating, comment) {
    const movieResponse = await fetch(`${API_URL}/api/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tmdbId: Number(tmdbId) })
    });

    if (!movieResponse.ok) {
        throw new Error("Failed to save movie");
    }

    const movie = await movieResponse.json();

    const reviewResponse = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movie: movie._id,
            rating,
            comment
        })
    });

    if (!reviewResponse.ok) {
        throw new Error("Failed to submit review");
    }

    return reviewResponse.json();
}
