//Hayes Meekins
import styles from "./SignUpForm.module.css"
import { useState } from "react";

function SignUpForm()
{
    const[form, setForm] = useState({username: "", email: "", password: "", confirmPassword: ""});
    const[usernameError, setUsernameError] = useState("");
    const[emailError, setEmailError] = useState("");
    const[passwordError, setPasswordError] = useState("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }   

    function validateEmail() {
        return emailPattern.test(form.email);
    }
    

    function handleSubmit(e) {
        e.preventDefault();

        let error = false;

        setUsernameError(null);
        setEmailError(null);
        setPasswordError(null);
       
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
        } 
        else if (form.password !== form.confirmPassword) {
            setPasswordError("Passwords do not match!");
            error = true;
        }

        if (error) {
            return;
        }
        
        console.log(form); 
    }

    return (
        <div className={styles.signUp}>
            <h2>Sign Up</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formElement}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        name="username" 
                        value={form.username} 
                        onChange={handleChange} 
                        placeholder="Username"
                    />
                    {usernameError != null && <p className={styles.error}>{usernameError}</p>}
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        placeholder="Email"
                    />
                    {emailError != null && <p className={styles.error}>{emailError}</p>}
                </div>

                <div className={styles.formElement}>
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password" 
                        value={form.password} 
                        onChange={handleChange} 
                        type="password"
                        placeholder="Password" 
                    />
                    <p className={styles.requirements}>Password must be at least 6 characters and 
                        contain at least one digit, lowercase letter and uppercase letter.
                    </p>
                </div>
                
                <div className={styles.formElement}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        name="confirmPassword" 
                        value={form.confirmPassword} 
                        onChange={handleChange} 
                        type="password"
                        placeholder="Confirm Password"
                    />
                    {passwordError != null && <p className={styles.error}>{passwordError}</p>}
                </div>

                
                <button type="submit" onSubmit={handleSubmit} className={styles.signUpButton}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm