//Hayes Meekins
import styles from "./SignUp.module.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm"

function SignUp() {
    return (
        <main className={styles.form}>
            <SignUpForm />
        </main>
    )
}

export default SignUp