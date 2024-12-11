'use client'

import React from "react";
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth'
import { User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import Loading from "@/components/global/loading";

const auth = getAuth(firebase_app)

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
} : {
    children: React.ReactNode
}) => {
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user)  => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {loading ? Loading() : children}
        </AuthContext.Provider>
    )
}