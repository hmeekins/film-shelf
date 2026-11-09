// Hayes Meekins

import { useState } from "react";
import styles from "./Home.module.css";
import About from "../../components/About/About";
import Shelf from "../../components/Shelf/Shelf";

function Home() {
    const [watchlistCount, setWatchlistCount] = useState(0);

    const addWatchListCount = () => {
        setWatchlistCount(count => count + 1);
    };

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <About />
            </div>

            <div className={styles.content}>
                <Shelf
                    movies={[]}
                    movieBehaviour={addWatchListCount}
                />
            </div>
        </div>
    );
}

export default Home;