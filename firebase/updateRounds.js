import { collection, addDoc, getDocs, setDoc, query, where } from "firebase/firestore"; 
import { db } from "./firebaseConfig";

// Add a round from fixture data 
export const addRoundFromFixture = async (fixture) => {
    try {
        const roundsRef = await collection(db, "rounds")
        const q = query(roundsRef, where('status', '==', 'OP'))
        const querySnapshot = await getDocs(q)
        if(!querySnapshot.empty){
            console.log('Ya hay un round abierto')
            return
        }
        const roundRef = await addDoc(collection(db, "rounds"), {
            ...fixture
        })
        console.log("Document written with ID: ", roundRef.id)

    } catch (e) {
        console.error("Error adding document: ", e)
    }
}


// Actualizar full round OP
export const updateFullRound = async (round) => {
    try {
        const roundRef = collection(db, "rounds")
        const q = query(roundRef, where('status', '==', 'OP'))
        const querySnap = await getDocs(q)

        if (!querySnap.empty) {
            const roundDoc = querySnap.docs[0]
            const roundRef = roundDoc.ref

            await setDoc(roundRef, { ...round }, { merge: true })
            console.log("Document updated with ID: ", roundRef.id)
        }
    } catch (e) {
        console.error("Error updating document: ", e)
    }
}


// Actualizar STATUS del round
export const updateRoundStatus = async (roundNumber, status, newStatus) => {
    try {
        const roundRef = collection(db, "rounds")
        const q = query(roundRef, 
            where('status', '==', status),
            where('roundnumber', '==', roundNumber)
        )
        const querySnap = await getDocs(q)

        if (!querySnap.empty) {
            const roundDoc = querySnap.docs[0]
            const roundRef = roundDoc.ref

            await setDoc(roundRef, {
                status: newStatus
            }, { merge: true })
            console.log(`Status updated to: ${newStatus}`)
        } else {
            console.log(`no se pudo encontrar el round ${roundNumber} con status ${status}`)
        }
    } catch (e) {
        console.error("Error updating status: ", e)
    }
}