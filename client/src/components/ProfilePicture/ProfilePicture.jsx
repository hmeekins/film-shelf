// Hayes Meekins

import { API_URL } from "../../config";
import defaultAvatar from "../../assets/default-avatar.png";
import styles from "./ProfilePicture.module.css";

function ProfilePicture({ user, size = 42 }) {
    const image = user?.profilePicture
        ? `${API_URL}/uploads/${user.profilePicture}`
        : defaultAvatar;

    return (
        <img
            className={styles.profilePicture}
            src={image}
            alt={user ? `${user.username}'s profile picture` : "Default profile picture"}
            style={{ width: size, height: size }}
        />
    );
}

export default ProfilePicture;