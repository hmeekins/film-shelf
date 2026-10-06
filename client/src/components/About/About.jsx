//Hayes Meekins
import styles from "./About.module.css";
function About() {
    return(
        <div className={styles.about}>
            <h2>Your Movies <br /><span>On Display</span></h2>
            <p>Rate movies you've seen, view your collection,
                find suggestions on what to watch next
            </p>
        </div>
    )
}

export default About