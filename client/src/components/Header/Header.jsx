//Hayes Meekins

import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import popcorn from "../../assets/popcorn.png";
import styles from "./Header.module.css";

function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={popcorn} alt="popcorn logo"/>
                <h1>Film <span>Shelf</span></h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink></li>
                    <li><NavLink to="/movies" className={({ isActive }) => isActive ? styles.active : ""}>My Movies</NavLink></li>
                    <li><NavLink to="/watchlist" className={({ isActive }) => isActive ? styles.active : ""}>Watchlist</NavLink></li>
                    <li><NavLink to="/browse" className={({ isActive }) => isActive ? styles.active : ""}>Browse</NavLink></li>
                    <li><Button to="/signup">Sign Up</Button></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;