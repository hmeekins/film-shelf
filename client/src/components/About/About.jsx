// Hayes Meekins

import tmdbLogo from "../../assets/tmdb-logo.svg";
import styles from "./About.module.css";

function About() {
    return (
        <div className={styles.about}>
            <h2>Your Movies <br /><span>On Display</span></h2>

            <p>
                Welcome to FilmShelf, your personal space to explore,
                rate, and collect movies. Discover new films, browse
                movie details, share your thoughts through reviews,
                and build a collection of your favorites. Whether
                you're revisiting a classic or looking for something
                new to watch, FilmShelf keeps your movie experience
                organized and on display.
            </p>
  
            <div className={styles.attribution}>
                <img
                    src={tmdbLogo}
                    alt="The Movie Database (TMDB)"
                className={styles.tmdbLogo}
                />

                <p>
                    Movie information and images are provided by{" "}
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        The Movie Database (TMDB)
                    </a>.
                    This product uses the TMDB API but is not endorsed
                    or certified by TMDB.
                </p>
            </div>
        </div>
    );
}

export default About;