// Hayes Meekins

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./models/db");
const Movie = require("./models/Movie");
const Review = require("./models/Review");

const movies = [
    {
        title: "Interstellar",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Science Fiction"],
        description: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        tmdbId: 157336,
        posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        title: "Inception",
        releaseYear: 2010,
        genres: ["Action", "Science Fiction", "Adventure"],
        description: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
        tmdbId: 27205,
        posterPath: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
    },
    {
        title: "The Dark Knight",
        releaseYear: 2008,
        genres: ["Drama", "Action", "Crime", "Thriller"],
        description: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
        tmdbId: 155,
        posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        title: "The Matrix",
        releaseYear: 1999,
        genres: ["Action", "Science Fiction"],
        description: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
        tmdbId: 603,
        posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },
    {
        title: "Parasite",
        releaseYear: 2019,
        genres: ["Comedy", "Thriller", "Drama"],
        description: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        tmdbId: 496243,
        posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
    },
    {
        title: "Spirited Away",
        releaseYear: 2001,
        genres: ["Animation", "Family", "Fantasy"],
        description: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
        tmdbId: 129,
        posterPath: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
    }
];

async function seedDatabase() {
    await connectDB();

    await Review.deleteMany({});
    await Movie.deleteMany({});

    const insertedMovies = await Movie.insertMany(movies);

    const reviews = [
        {
            movie: insertedMovies[0]._id,
            rating: 5,
            comment: "Amazing visuals and an incredible soundtrack!"
        },
        {
            movie: insertedMovies[0]._id,
            rating: 4,
            comment: "A great sci fi movie with an interesting story."
        },
        {
            movie: insertedMovies[1]._id,
            rating: 5,
            comment: "A fascinating story that keeps you thinking."
        }
    ];

    await Review.insertMany(reviews);

    console.log(`Seeded ${insertedMovies.length} movies.`);
    console.log(`Seeded ${reviews.length} reviews.`);
    await mongoose.disconnect();
}

seedDatabase();