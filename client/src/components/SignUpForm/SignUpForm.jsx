import { useState } from "react";

function SignUpForm()
{
    const[form, setForm] = useState({username: "", email: "", password: "", confirmPassword: ""});
    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }   

    function handleSubmit(e) {e.preventDefault(); console.log(form); }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" value={form.username} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input name="email" value={form.email} onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input name="password" value={form.password} onChange={handleChange} />
                
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            </form>
        </div>
    )
}

export default SignUpForm