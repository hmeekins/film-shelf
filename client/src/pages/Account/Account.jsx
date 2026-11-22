// Hayes Meekins

import { useCurrentUser } from "../../hooks/useCurrentUser";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import styles from "./Account.module.css";

function Account() {
    const { user, loading } = useCurrentUser();

    if (loading) {
        return <p>Loading account...</p>;
    }

    if (!user) {
        return <p>Please log in to view your account.</p>;
    }

    return (
        <div className={styles.account}>
            <div className={styles.profileSection}>
                <div className={styles.profileHeader}>
                    <ProfilePicture user={user} size={140} />

                    <div className={styles.profileInfo}>
                        <h1>{user.username}</h1>
                        <p>FilmShelf Member</p>
                    </div>
                </div>

                <div className={styles.accountInfo}>
                    <h2>Account Information</h2>

                    <div className={styles.infoRow}>
                        <span>Username</span>
                        <p>{user.username}</p>
                    </div>

                    <div className={styles.infoRow}>
                        <span>Email</span>
                        <p>{user.email}</p>
                    </div>

                    <div className={styles.accountActions}>
                        <button type="button" disabled>
                            Change Password
                        </button>

                        <button
                            type="button"
                            className={styles.deleteButton}
                            disabled
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            <section className={styles.reviews}>
                <div className={styles.sectionHeader}>
                    <h2>Recent Reviews</h2>
                </div>

                <p className={styles.emptyReviews}>
                    Your recent reviews will appear here.
                </p>
            </section>
        </div>
    );
}

export default Account;