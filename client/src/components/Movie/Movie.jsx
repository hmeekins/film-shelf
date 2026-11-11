// Hayes Meekins
import styles from "./Movie.module.css";

function Movie({ name, imgSrc, movieBehaviour }) {
    return (
        <button
            type="button"
            className={styles.movie}
            onClick={movieBehaviour}
            aria-label={`View ${name}`}
        >
            {imgSrc ? (
                <img src={imgSrc} alt={`${name} poster`} />
            ) : (
                <span>{name}</span>
            )}
        </button>
    );
}

export default Movie;