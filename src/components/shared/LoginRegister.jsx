import { useState, useEffect } from 'react'
import { 
    auth, 
    provider, 
    signInWithPopup, 
    signInWithRedirect, 
    getRedirectResult 
} from '../../../firebase/firebaseConfig'
import { checkUser } from '../../../firebase/firebaseFunctions'

const LoginRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log("Starting Google login process...")
    // Función para detectar si el usuario está en un dispositivo móvil
    const isMobile = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        return /android|iPad|iPhone|iPod/i.test(userAgent)
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError(null)
        console.log("Starting Google login process...")
        try {
            if (isMobile()) {
                // Usa Redirect en móviles
                await signInWithRedirect(auth, provider)
            } else {
                // Usa Popup en desktop
                const result = await signInWithPopup(auth, provider)
                console.log("User logged in:", result.user)
                const user = result.user;
                await checkUser(user); // Verifica el usuario en tu base de datos
                
            }
        } catch (err) {
            console.error('Error completo:', err);
            console.error('Código del error:', err.code);
            console.error('Mensaje del error:', err.message)
            if (err.customData) {
                console.error('Datos personalizados:', err.customData);
            }
            setError(`Error: ${err.code}`);
        } finally {
            setLoading(false);
        }
    };

    // Manejar los resultados de redirección al cargar la página
    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    await checkUser(user);
                }
            } catch (err) {
                console.error('Error manejando redirección:', err.code, err.message, err);
                setError(`Error: ${err.code}`);
            }
        };
        handleRedirect();
    }, []);

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
    );
};

export default LoginRegister;