// Hayes Meekins

import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./AuthForm.module.css";

function ChangePasswordForm() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        let error = false;

        setCurrentPasswordError("");
        setPasswordError("");

        if (!form.currentPassword) {
            setCurrentPasswordError("Enter your current password");
            error = true;
        }

        if (!passwordPattern.test(form.newPassword)) {
            setPasswordError("Password does not meet requirements");
            error = true;
        } else if (form.newPassword === form.currentPassword) {
            setPasswordError("New password must be different");
            error = true;
        } else if (form.newPassword !== form.confirmPassword) {
            setPasswordError("Passwords do not match!");
            error = true;
        }

        if (error) {
            return;
        }

    }

    return (
        <div className={styles.auth}>
            <h2>Change Password</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formElement}>
                    <label htmlFor="currentPassword">
                        Current Password
                    </label>

                    <TextInput
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                    />

                    {currentPasswordError && (
                        <p className={styles.error}>
                            {currentPasswordError}
                        </p>
                    )}
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="newPassword">
                        New Password
                    </label>

                    <TextInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                    />

                    <p className={styles.requirements}>
                        Password must be at least 8 characters and
                        contain at least one digit, lowercase letter
                        and uppercase letter.
                    </p>
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>

                    <TextInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                    />

                    {passwordError && (
                        <p className={styles.error}>
                            {passwordError}
                        </p>
                    )}
                </div>

                <Button type="submit">
                    Change Password
                </Button>
            </form>

            <p className={styles.switchInfo}>
                <Link
                    to="/account"
                    className={styles.switchButton}
                >
                    Back to Account
                </Link>
            </p>
        </div>
    );
}

export default ChangePasswordForm;