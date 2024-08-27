import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Play from './pages/Play'
import Admin from './pages/Admin'



const App = () => {
    return(
        <>
            <header>
                <h1>Prodemaster</h1>
            </header>
           <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/pages/admin">Admin</Link>
                </li>
                <li>
                    <Link to="/pages/play">Jugar</Link>
                </li>
            </ul>
           </nav>
           <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/pages/admin" element={<Admin />}/>
                <Route path="/pages/play" element={<Play />}/>
           </Routes>
        </>
    )
}

export default App