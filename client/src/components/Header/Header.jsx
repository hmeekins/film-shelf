import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
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
                     <li><NavLink to="/watchlist" className={({ isActive }) => isActive ? styles.active : ""}>Watchlist ({count})</NavLink></li>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink></li>
                    <li><NavLink to="/movies" className={({ isActive }) => isActive ? styles.active : ""}>My Movies</NavLink></li>
                    <li><NavLink to="/browse" className={({ isActive }) => isActive ? styles.active : ""}>Browse</NavLink></li>
                    <li><NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : ""}>Sign Up</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;