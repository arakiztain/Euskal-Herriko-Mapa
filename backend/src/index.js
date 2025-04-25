import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session'; // ← Importación faltante
import router from './routes/index.js';
import './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// Configuración de sesión (¡Ahora en la posición correcta!)
app.use(session({
  secret: process.env.SECRET || 'fallback_secret_para_desarrollo',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

// Rutas
app.use('/', router);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});