// Hayes Meekins
import styles from "./Shelf.module.css";
import shelfImage from "../../assets/shelf.png";
import Movie from "../Movie/Movie";

function Shelf({ movies = [], movieBehaviour }) {
    const shelves = [];

    for (let i = 0; i < movies.length; i += 4) {
        shelves.push(movies.slice(i, i + 4));
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

                    <img
                        className={styles.shelfImage}
                        src={shelfImage}
                        alt=""
                    />
                </div>
            ))}
        </div>
    );
}

export default Shelf;