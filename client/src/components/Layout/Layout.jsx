// Hayes Meekins

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {!menuOpen && (
                <>
                    <main className={styles.content}>
                        <Outlet />
                    </main>

                    <Footer />
                </>
            )}
        </div>
    );
}

export default Layout;