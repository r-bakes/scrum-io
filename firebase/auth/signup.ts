import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
    let user = null, error = null;
    try {
        user = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e;
    } 

    return { user, error };
}