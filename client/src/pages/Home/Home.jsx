import styles from "./Home.module.css"
import Header from "../../components/Header/Header"
import About from "../../components/About/About"
import Shelf from "../../components/Shelf/Shelf"
function Home()
{
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <About />
            </div>
            <div className={styles.content}>
                <Shelf />
            </div>
        </div>
    )
}

export default Home;