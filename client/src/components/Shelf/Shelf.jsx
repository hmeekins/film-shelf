import styles from "./Shelf.module.css";
import shelfImage from "../../assets/shelf.png"
import Movie from "../Movie/Movie";
import dunePoster from "../../assets/dunePoster.jpg";
import fightClubPoster from "../../assets/fightClubPoster.png";
import avengersPoster from "../../assets/avengersEndgamePoster.jpg";
import odysseyPoster from "../../assets/theOdysseyPoster.jpg";

function Shelf() {
    const movies = [
        {
            id: 1,
            posterPath: dunePoster,
            name: "Dune",
        },
        {
            id: 2,
            posterPath: fightClubPoster,
            name: "Fight Club",
        },
        {
            id: 3,
            posterPath: avengersPoster,
            name: "Avengers Endgame",
        },
        {
            id: 4,
            posterPath: odysseyPoster,
            name: "The Odyssey"
        }
    ]

    return (
        <div className={styles.shelf}>
            <div className={styles.movies}>
                {movies.map((movie) => (
                    <Movie key={movie.id} imgSrc={movie.posterPath} name={movie.name}/>
                ))}
            </div>

            <img
                className={styles.shelfImage}
                src={shelfImage}
                alt=""
            />
        </div>
    );
}

export default Shelf;