import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Map from './pages/Map/Map';
import Argibidea from './pages/Argibidea/Argibidea';

function App() {
  return (
    
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/map' element={<Map />} />
      <Route path='/argibidea' element={<Argibidea />} />

    </Routes>
  );
}

export default App;
