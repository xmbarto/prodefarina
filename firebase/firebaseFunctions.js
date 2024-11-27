import { collection, doc, addDoc, setDoc, getDoc, getDocs } from "firebase/firestore"; 
import { db } from "./firebaseConfig";


//check if the user exist
export const checkUser = async ( user ) => {
    try{
        const userDoc = doc(db, 'users', user.uid)
        const docSnapshot = await getDoc(userDoc)
    
        if(!docSnapshot.exists()) {
            await setDoc(userDoc, { 
                role: 'player',
                email: user.email
            })
        }
        return docSnapshot.data().role

    } catch (e) {
        console.error('Error durante el registro:', e)
    }
}

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

// Obtener data de round OP y retornar el round en un objeto
export const getOpenRound = async () => {
    const querySnapshot = await getDocs(collection(db, "rounds"))
    let openRound
    querySnapshot.forEach((doc) => {
        if(doc.data().status === 'OP'){
            openRound = doc.data()
        }
    });
    return openRound
}


// Obtener data de round OG y retornar el round en un objeto
export const getOngoingRound = async () => {
    const querySnapshot = await getDocs(collection(db, "rounds"))
    let ongoingRound
    querySnapshot.forEach((doc) => {
        if(doc.data().status === 'OG'){
            ongoingRound = doc.data()
        }
    });
    return ongoingRound
}

// Obtener data de round FI y retornar el round en un objeto
export const getFinishedRound = async () => {
    const querySnapshot = await getDocs(collection(db, "rounds"))
    let finishedRound
    querySnapshot.forEach((doc) => {
        if(doc.data().status === 'FI'){
            finishedRound = doc.data()
        }
    });
    return finishedRound
}






