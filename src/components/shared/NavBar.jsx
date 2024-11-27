import { Link } from 'react-router-dom'
import { auth } from '../../../firebase/firebaseConfig'
import { checkUser } from '../../../firebase/firebaseFunctions'
import { useEffect, useState } from 'react'

const NavBar = () => {
    const [role, setRole] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        const fetchRole = async () => {
            const user = auth.currentUser
            if (user) {
                try {
                    const userRole = await checkUser(user)
                    setRole(userRole)
                    setName(user.displayName)
                } catch (error) {
                    console.error('Error al obtener el rol del usuario:', error)
                }
            }
        }
        
        fetchRole()
    },[])

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                    <li>
                        <Link to="/prode">Jugar</Link>
                    </li>
                </ul>
            </nav>
            {name && <h5>Jugador: {name}</h5>}
        </>
    )
}

export default NavBar