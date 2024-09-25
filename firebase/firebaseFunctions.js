import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebaseConfig";


// Add a player
export const addPlayer = async (name) => {
   try {
    const docRef = await addDoc(collection(db, "players"), {
        name: name,
        category: "amateur",
    })
    console.log("Document written with ID: ", docRef.id)
   } catch (e) {
    console.error("Error adding document: ", e)
   }
}

// Add a round from fixture data 
export const addRoundFromFixture = async (fixture) => {
    try {
        const roundRef = await addDoc(collection(db, "rounds"), {
            ...fixture,
        })
        console.log("Document written with ID: ", roundRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

