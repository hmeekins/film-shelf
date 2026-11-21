// Hayes Meekins

import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import popcorn from "../../assets/popcorn.png";
import styles from "./Header.module.css";

function Header({ menuOpen, setMenuOpen }) {
    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
            <div className={styles.headerTop}>
                <div className={styles.logo}>
                    <img src={popcorn} alt="popcorn logo" />
                    <h1>Film <span>Shelf</span></h1>
                </div>

                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
                <ul>
                    <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink></li>
                    <li><NavLink to="/movies" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>My Movies</NavLink></li>
                    <li><NavLink to="/watchlist" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Watchlist</NavLink></li>
                    <li><NavLink to="/browse" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ""}>Browse</NavLink></li>
                    <li><Button to="/signup">Sign Up</Button></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;