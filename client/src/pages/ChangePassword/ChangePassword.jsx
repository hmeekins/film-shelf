// Hayes Meekins

import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ChangePasswordForm from "../../components/AuthForms/ChangePasswordForm";
import styles from "../Auth/Auth.module.css";

function ChangePassword() {
    const { user, loading } = useCurrentUser();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/auth?mode=login" replace />;
    }

    return (
        <div className={styles.form}>
            <ChangePasswordForm />
        </div>
    );
}

export default ChangePassword;