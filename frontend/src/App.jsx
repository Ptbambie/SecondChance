import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/accueil' element={<HomePage/>} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
