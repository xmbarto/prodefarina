import { useState } from 'react'
import { auth, provider, signInWithPopup } from '../../../firebase/firebaseConfig'
import { checkUser } from '../../../firebase/firebaseFunctions'

const LoginRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            await checkUser(user)
        } catch (err) {
            setError('Hubo un problema al iniciar sesión con Google.', err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button 
                className='home-login-button'
                onClick={handleGoogleLogin} 
                disabled={loading}
            > 
                {loading ? 'Cargando...' : 'Inicia sesión con Google para jugar'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default LoginRegister
