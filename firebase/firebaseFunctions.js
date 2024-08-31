import { doc, collection, setDoc, addDoc } from "firebase/firestore"; 
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

// Add a round
export const addRound = async (round) => {
    
}

// rounds
//   |
//   └── round-id
//         ├── roundnumber -> round
//         ├── year -> year
//         ├── entryfee -> empty
//         ├── jackpot -> empty
//         ├── matches
//               ├── match-id-1
//                     |away -> away.name
//                     |home -> home.name
//                     |date -> date
//                     |winner -> null

