import styles from "./Movie.module.css";

function Movie({name, imgSrc})
{
    return(
        <button className={styles.movie}>
            <img src={imgSrc} alt={name} />
        </button>
    )
}

export default Movie;