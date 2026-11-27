// Hayes Meekins

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
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
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let error = false;

        setCurrentPasswordError("");
        setPasswordError("");
        setServerError("");

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

        try {
            setSubmitting(true);

            const response = await fetch(`${API_URL}/api/auth/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const message = data.message || data.error || "Unable to change password";
                if (message === "Current password is incorrect") {
                    setCurrentPasswordError(message);
                }
                else {
                    setServerError(message);
                }   
                return;
            }

            navigate("/account");

        } catch (error) {
            setServerError("Unable to connect to the server");
        } finally {
            setSubmitting(false);
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

                <Button type="submit" disabled={submitting}>
                    {submitting ? "Changing Password..." : "Change Password"}
                </Button>

                {serverError && (
                    <p className={styles.serverError}>
                        {serverError}
                    </p>
            )}
            </form>
        </div>
    );
}

export default ChangePasswordForm;