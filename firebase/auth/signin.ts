import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
    let user = null, error = null;
    try {
        user = await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e;
    }
    return { user, error };
}