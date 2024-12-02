import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../firebase/firebaseConfig"
import LoginRegister from "../components/shared/LoginRegister"

const Home = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return(
        <>
            {user ? (
                <div>
                    <h3>Bienvenido {user.displayName}</h3>
                    <button onClick={() => auth.signOut()}>Cerrar sesion</button>
                </div>
            ) : (
                <LoginRegister />
            )}
        </>
    )
}

export default Home