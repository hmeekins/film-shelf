// Hayes Meekins

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { API_URL } from "../../config";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./ProfilePictureUpload.module.css";

function ProfilePictureUpload({ user }) {
    const fileInputRef = useRef(null);
    const [uploadError, setUploadError] = useState("");
    const { setUser } = useCurrentUser();

    function handleClick() {
        fileInputRef.current.click();
    }

    async function handleFileChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setUploadError("");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/profile-picture`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed.");
            }

            setUser(data);
        } catch (error) {
            setUploadError(error.message);
        }

        event.target.value = "";
    }

    return (
        <div className={styles.uploadContainer}>
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

            {uploadError && (
                <p className={styles.error}>{uploadError}</p>
            )}
        </div>
    );
}

export default ProfilePictureUpload;