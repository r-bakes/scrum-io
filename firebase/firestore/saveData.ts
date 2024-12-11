import firebase_app from "../config"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const db = getFirestore(firebase_app)

export default async function saveData(collection: string, id: string, data: object) {
    let docRef = doc(db, collection, id)
    let result = null;
    let error = null;

    try {
        result = await setDoc(
            docRef, 
            data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}