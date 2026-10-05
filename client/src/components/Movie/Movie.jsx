import styles from "./Movie.module.css";

function Movie({name, imgSrc, movieBehaviour})
{
    return(
        <button className={styles.movie} onClick={movieBehaviour}>
            <img src={imgSrc} alt={name} />
        </button>
    )
}

export default Movie;