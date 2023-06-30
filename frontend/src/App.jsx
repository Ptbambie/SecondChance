import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import './App.css';
import AddItem from './pages/AddItem';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/accueil' element={<HomePage />} />
          <Route path='/additem' element={<AddItem />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
