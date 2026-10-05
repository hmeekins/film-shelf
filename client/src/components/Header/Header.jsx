import styles from "./Header.module.css";
import popcorn from "../../assets/popcorn.png";
function Header({ count }) {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={popcorn} alt="popcorn logo"/>
                <h1>Film <span>Shelf</span></h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="">Watchlist ({count})</a></li>
                    <li><a href="">Home</a></li>
                    <li><a href="">My Movies</a></li>
                    <li><a href="">Browse</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;