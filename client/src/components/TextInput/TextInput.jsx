// Hayes Meekins

import styles from "./TextInput.module.css";

function TextInput({ id, type = "text", ...props }) {
    return (
        <input
            id={id}
            type={type}
            className={styles.input}
            {...props}
        />
    );
}

export default TextInput;
