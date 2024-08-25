import { doc, collection, setDoc, addDoc } from "firebase/firestore"; 
import { db } from "./firebaseConfig";


// Add a player
export const addPlayer = async (name) => {
   try {
    const docRef = await addDoc(collection(db, "players"), {
        name: name,
        category: "amateur",
        historical:{}
    })
    console.log("Document written with ID: ", docRef.id)
   } catch (e) {
    console.error("Error adding document: ", e)
   }
}