// Hayes Meekins

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./AuthForm.module.css";

function LoginForm({ onSwitch }) {
    const navigate = useNavigate();
    const { setUser } = useCurrentUser();

    const [form, setForm] = useState({
        identifier: "",
        password: ""
    });

    const [identifierError, setIdentifierError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setIdentifierError("");
        setPasswordError("");

        let error = false;

        if (!form.identifier.trim()) {
            setIdentifierError("Enter your username or email");
            error = true;
        }

        if (!form.password) {
            setPasswordError("Enter your password");
            error = true;
        }

        if (error) {
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    identifier: form.identifier.trim(),
                    password: form.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setIdentifierError(data.message || "Unable to log in");
                return;
            }
            
            setUser(data);
            navigate("/");
        } catch (error) {
            setIdentifierError("Unable to connect to the server");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={styles.auth}>
            <h2>Log In</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formElement}>
                    <label htmlFor="identifier">Username or Email</label>
                    <TextInput
                        id="identifier"
                        name="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        placeholder="Username or Email"
                    />
                    {identifierError && (
                        <p className={styles.error}>
                            {identifierError}
                        </p>
                    )}
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="password">Password</label>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {passwordError && (
                        <p className={styles.error}>
                            {passwordError}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={submitting}>
                    {submitting ? "Logging In..." : "Log In"}
                </Button>
            </form>

            <p className={styles.switchInfo}>
                Don't have an account?{" "}
                <button
                    onClick={onSwitch}
                    className={styles.switchButton}
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}

export default LoginForm;
