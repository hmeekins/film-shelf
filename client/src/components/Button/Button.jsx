// Hayes Meekins

import { NavLink } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ children, onClick, to, type = "button", variant = "primary", disabled = false }) {
    if (to) {
        return (
            <NavLink to={to} className={`${styles.button} ${styles[variant]}`}>
                {children}
            </NavLink>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]}`}
        >
            {children}
        </button>
    );
}

export default Button;