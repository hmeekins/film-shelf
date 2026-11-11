// Hayes Meekins

import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./Search.module.css";

function Search({ onSearch }) {
    const [input, setInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(input.trim());
    }

    return (
        <form
            className={styles.search}
            onSubmit={handleSubmit}
            role="search"
        >
            <TextInput
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search movies..."
                aria-label="Search movies"
                maxLength={100}
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
}

export default Search;
