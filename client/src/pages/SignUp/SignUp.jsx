//Hayes Meekins
import styles from "./SignUp.module.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm"

function SignUp() {
    return (
        <div className={styles.form}>
            <SignUpForm />
        </div>
    );
}

export default SignUp