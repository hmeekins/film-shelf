import styles from "./Home.module.css"
import Header from "../../components/Header/Header"
import About from "../../components/About/About"
function Home()
{
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <Header />
            </div>
            <div>
                <About />
            </div>
        </div>
    )
}

export default Home;