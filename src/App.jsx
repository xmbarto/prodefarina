import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/shared/Header'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Prode from './pages/Prode'



const App = () => {

    return(
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pages/admin" element={<Admin />} />
                    <Route path="/pages/prode" element={<Prode />} />
                </Routes>    
            </main>
        </Router>
        
    )
}

export default App