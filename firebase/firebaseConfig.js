import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA88rKLGnbeyq25IRMdve08pqCc7gx1YiY",
  authDomain: "prode-farina-43155.firebaseapp.com",
  projectId: "prode-farina-43155",
  storageBucket: "prode-farina-43155.appspot.com",
  messagingSenderId: "353002669932",
  appId: "1:353002669932:web:e0dfc35c9201e096b55549"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}