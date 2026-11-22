// Hayes Meekins

import { useState } from "react";
import { API_URL } from "../../config";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./AuthForm.module.css";

function SignUpForm({onSwitch}) {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function validateEmail() {
        return emailPattern.test(form.email);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let error = false;

        setUsernameError(null);
        setEmailError(null);
        setPasswordError(null);
        setServerError("");

        if (form.username.length < 4) {
            setUsernameError("Must be at least 4 characters");
            error = true;
        }

        if (!validateEmail()) {
            setEmailError("Invalid Email Address");
            error = true;
        }

        if (!passwordPattern.test(form.password)) {
            setPasswordError("Password does not meet requirements");
            error = true;
        } else if (form.password !== form.confirmPassword) {
            setPasswordError("Passwords do not match!");
            error = true;
        }

        if (error) {
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: form.email,
                    username: form.username,
                    password: form.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.message || "Unable to create account");
                return;
            }

            onSwitch();
        } catch (error) {
            setServerError("Unable to connect to the server");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={styles.auth}>
            <h2>Sign Up</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formElement}>
                    <label htmlFor="username">Username</label>
                    <TextInput
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    {usernameError != null && (
                        <p className={styles.error}>
                            {usernameError}
                        </p>
                    )}
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="email">Email</label>
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {emailError != null && (
                        <p className={styles.error}>
                            {emailError}
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
                    <p className={styles.requirements}>
                        Password must be at least 8 characters and
                        contain at least one digit, lowercase letter
                        and uppercase letter.
                    </p>
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <TextInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />
                    {passwordError != null && (
                        <p className={styles.error}>
                            {passwordError}
                        </p>
                    )}
                </div>
                
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Creating Account..." : "Sign Up"}
                </Button>
                    {serverError && (
                        <p className={styles.serverError}>
                            {serverError}
                        </p>
                    )}
                
            </form>
            <p className={styles.switchInfo}
                >Have an account?{" "}
                <button 
                    onClick={onSwitch} 
                    className={styles.switchButton}
                >
                    Log in
                </button>
            </p>
        </div>
    );
}

export default SignUpForm;
