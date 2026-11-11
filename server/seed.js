// Hayes Meekins

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./models/db");
const Movie = require("./models/Movie");
const Review = require("./models/Review");
const { getTmdbMovie } = require("./services/tmdbService");

const movieIds = [
    550,     // Fight Club
    299536,  // Avengers: Infinity War
    438631,  // Dune (2021)
    264660,  // Ex Machina
    597,      // Titanic
    940721   // Godzilla Minus One
];

async function seedDatabase() {
    try {
        await connectDB();

        await Review.deleteMany({});
        await Movie.deleteMany({});

        const movies = await Promise.all(
            movieIds.map(async (tmdbId) => {
                const tmdbMovie = await getTmdbMovie(tmdbId);

                return {
                    tmdbId,
                    title: tmdbMovie.title,
                    posterPath: tmdbMovie.posterPath
                };
            })
        );

        const insertedMovies = await Movie.insertMany(movies);

        const reviews = [
            {
                movie: insertedMovies[0]._id,
                rating: 5,
                comment: "One of my favorite movies. Great performances and an unforgettable ending."
            },
            {
                movie: insertedMovies[0]._id,
                rating: 4,
                comment: "Really interesting story with a lot to think about."
            },
            {
                movie: insertedMovies[1]._id,
                rating: 5,
                comment: "An incredible superhero crossover with an amazing villain."
            },
            {
                movie: insertedMovies[2]._id,
                rating: 5,
                comment: "Beautiful cinematography and an incredible soundtrack."
            },
            {
                movie: insertedMovies[3]._id,
                rating: 4,
                comment: "A thought-provoking science fiction movie."
            },
            {
                movie: insertedMovies[4]._id,
                rating: 5,
                comment: "A classic with memorable characters and an emotional story."
            }
        ];

        await Review.insertMany(reviews);

        for (const movie of insertedMovies) {
            const movieReviews = reviews.filter(
                (review) => review.movie.equals(movie._id)
            );

            await Movie.findByIdAndUpdate(movie._id, {
                reviewSum: movieReviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                ),
                reviewAmount: movieReviews.length
            });
        }

        console.log(`Seeded ${insertedMovies.length} movies.`);
        console.log(`Seeded ${reviews.length} reviews.`);
    } catch (error) {
        console.error("Failed to seed database:", error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();