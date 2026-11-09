// Hayes Meekins
import styles from "./Shelf.module.css";
import Movie from "../Movie/Movie";

function Shelf({ movies = [], movieBehaviour }) {
    const shelves = [];

    for (let i = 0; i < movies.length; i += 5) {
        shelves.push(movies.slice(i, i + 5));
    }

    return (
        <div className={styles.shelves}>
            {shelves.map((shelfMovies, index) => (
                <div className={styles.shelf} key={index}>
                    <div className={styles.movies}>
                        {shelfMovies.map((movie) => (
                            <Movie
                                key={movie._id}
                                imgSrc={
                                    movie.posterPath
                                        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                                        : ""
                                }
                                name={movie.title}
                                movieBehaviour={() => movieBehaviour(movie)}
                            />
                        ))}
                    </div>

                    <div className={styles.shelfPlatform} aria-hidden="true">
                        <div className={styles.shelfTop} />
                        <div className={styles.shelfFront} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shelf;