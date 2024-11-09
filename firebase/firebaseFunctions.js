import { collection, doc, addDoc, getDocs, getDoc, setDoc, query, where } from "firebase/firestore"; 
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

// Obtener data de round open y retornar el round en un objeto
export const getOpenRound = async () => {
    const querySnapshot = await getDocs(collection(db, "rounds"));
    let openRound
    querySnapshot.forEach((doc) => {
        if(doc.data().status === 'OP'){
            openRound = doc.data()
        }
    });
    return openRound
}

// Actualizar data de round open con información que viene de otro componente
export const updateOpenRound = async (round) => {
    try {
        const roundRef = collection(db, "rounds")
        const q = query(roundRef, where('status', '==', 'OP'))
        const querySnap = await getDocs(q)

        if(!querySnap.empty){
            const roundDoc = querySnap.docs[0]
            const roundRef = roundDoc.ref
            await setDoc(roundRef, {
                ...round
            }, { merge: true })
            console.log("Document updated with ID: ", roundRef.id)
        }
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

