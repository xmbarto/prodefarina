import { useState } from 'react'
import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from '../../../firebase/firebaseConfig'

const LoginRegister = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState(null)

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
        }   catch (err) {
            setError(err.message)
        }
    }

    const handleEmailPassAuth = async (e) => {
        e.preventDefault()
        if(isRegistering) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (err) {
                setError(err.message)
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (err) {
                setError(err.message)
            }
        }
    }

    return (
        <div>
            <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>
            <form onSubmit={handleEmailPassAuth}>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button type='submit'>{ isRegistering ? 'Registrarse' : 'Iniciar sesión' }</button>
            </form>
            <button onClick={handleGoogleLogin}>Inicia sesion con Google</button>
            <p onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
            </p>
            {error && <p>{error}</p>}
        </div>
    )
}

export default LoginRegister