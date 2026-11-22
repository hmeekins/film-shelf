// Hayes Meekins

import { useSearchParams } from "react-router-dom";
import SignUpForm from "../../components/AuthForms/SignUpForm";
import LoginForm from "../../components/AuthForms/LoginForm";
import styles from "./Auth.module.css";

function Auth() {
    const [searchParams, setSearchParams] = useSearchParams();

    const showLogin = searchParams.get("mode") === "login";

    function switchForm() {
        setSearchParams({ mode: showLogin ? "signup" : "login" });
    }

    return (
        <div className={styles.form}>
            {showLogin ? (
                <LoginForm onSwitch={switchForm} />
            ) : (
                <SignUpForm onSwitch={switchForm} />
            )}
        </div>
    );
}

export default Auth;