import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase/firebaseConfig'
import { getUser } from '../../../firebase/firebaseFunctions'
import { useEffect, useState } from 'react'

const NavBar = () => {
    const [role, setRole] = useState(null)
    const [name, setName] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsAuthenticated(true)
                try {
                    const userData = await getUser(user.uid)
                    setRole(userData.role)
                    setName(userData.name)
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            } else {
                setIsAuthenticated(false)
                setRole(null)
                setName(null)
            }
        })

        // Cleanup para evitar fugas de memoria
        return () => unsubscribe()
    }, [])

    const handleLogOut = async() => {
        try{
            auth.signOut()
            setIsAuthenticated(false)
            setRole(null)
            setName(null)
            navigate('/')
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li><Link to="/prode">Jugar</Link></li>
                            {role === 'admin' && (
                                <li><Link to="/admin">Admin</Link></li>
                            )}
                            <li>{name}</li>
                            <li><button onClick={handleLogOut}>Cerrar Sesión</button></li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <li><Link to="/login-register">Iniciar Sesión</Link></li>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default NavBar