// Hayes Meekins

import { useRef } from "react";
import { Camera} from "lucide-react"
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./ProfilePictureUpload.module.css";

function ProfilePictureUpload({ user }) {
    const fileInputRef = useRef(null);

    function handleClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        console.log("Selected file:", file.name);
    }

    return (
        <div className={styles.upload}>
            <button
                type="button"
                className={styles.uploadButton}
                onClick={handleClick}
                aria-label="Change profile picture"
            >
                <ProfilePicture user={user} size={140} />

                <div className={styles.overlay}>
                    <Camera size={28} strokeWidth={2} />
                    <span>Change Photo</span>
                </div>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className={styles.fileInput}
            />
        </div>
    );
}

export default ProfilePictureUpload;