import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map/Map';

function App() {
  return (
    
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/map' element={<Map />} />

    </Routes>
  );
}

export default App;
