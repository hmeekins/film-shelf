# film-shelf
This is a movie review website, users can browse movies, add movies to watchlist, review movies, and view their collection which is made
to look like dvds on a shelf. Hoping to be able to create a movie recommending service that will use your movie reviews to find movies
you might enjoy if time permits. The biggest caviatte of this website is that in order to have a complete collection of movie data for users
to view I had to use an external db and api from www.themoviedb.org. The website still contains movie and review collections but movies are
primarily meant for storing tmdb id, poster path, and review data whereas other details are retrieved from tmdb. Movies get added to db whenever they are reviewed,
Reviews are linked to movies. Since there are no users yet a single person can submit multiple reviews for movies and pages like 'my movies' just render
movies in db instead of movies the user has reviewed.

Startup:
env:
- PORT=3000
- CLIENT_ORIGIN=http://localhost:5173
- MONGO_URI
- TMDB_TOKEN

In client: npm install, npm run dev
In server: npm install, npm run seed, npm run dev

Movie Routes:
- GET "/" returns all movies in database (when users are added will be updated to return all movies reviewed by user)
- GET "/:id" retrieves a movie based on its id
- POST "/" Checks if movie already exists, otherwise uses tmdb id to retrieve movie info and create a movie
- DELETE "/:id" Deletes movie from db

Review Routes:
- GET "/" Gets all reviews and related movie data from db (probably wont be used but added it when initially creating api)
- GET "/:id" Gets a specific review by id
- GET "/tmdb/:tmdbID", Gets review data for a specific movie, finds movie through its tmdbid in mongodb and then pulls review sum and number of reviews to calculate average rating as well as all reviews for movie
- POST "/" Creates a review with a number for rating and a comment and updates movie review sum and count
- PUT "/:id" Updates review
- DELETE "/:id" Deletes review

TMDB Routes
- GET "/movie/:tmdbId" Gets movie information from movies id
- GET "/popular" Retrieves all movies sorted by popularity (paginated so defaults to page 1 but will except a page paramter which helps with navigating through movies)
- GET "/search" Retrieves movies matching a search query (also paginated)



