import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import Admin from './pages/Admin';

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
