import { useState } from  "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Shelf from "../../components/Shelf/Shelf";
import Footer from "../../components/Footer/Footer";
function Home()
{
    const [watchlistCount, setWatchlistCount] = useState(0);

    const addWatchListCount = () => {
        setWatchlistCount(count => count + 1);
    }


    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <Header count={watchlistCount}/>
            </div>
            <div className={styles.content}>
                <About />
            </div>
            <div className={styles.content}>
                <Shelf movieBehaviour={addWatchListCount} />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default Home;