import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
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
            </ul>
           </nav>
                <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/pages/admin" element={<Admin />}/>
                </Routes>
        </>
    )
}

export default App