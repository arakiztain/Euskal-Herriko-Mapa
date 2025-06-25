import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la App</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Registro</button>
      </Link>
      <Link to="/map">
        <button>Mapa</button>
      </Link>
    </div>
  );
};

export default Home;
