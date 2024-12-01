import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

const LoginRegister = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Usuario logeado correctamente.");
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Actualiza el nombre del usuario
                await updateProfile(user, { displayName });
                console.log("Usuario registrado:", user);
            }

            // Limpia los campos después del éxito
            if (!isLogin) {
                setDisplayName("");
            }
            setEmail("");
            setPassword("");
        } catch (err) {
            setError(err.message);
            console.error("Error al registrarse o iniciar sesión:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h3>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
            </form>
        </div>
    );
};

export default LoginRegister;
