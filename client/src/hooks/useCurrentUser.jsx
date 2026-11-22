// Hayes Meekins

import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";

const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCurrentUser() {
            try {
                const response = await fetch(`${API_URL}/api/auth/me`, {
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Unable to get current user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        getCurrentUser();
    }, []);

    async function logout() {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Unable to log out");
        }

        setUser(null);
    }

    return (
        <CurrentUserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(CurrentUserContext);
}