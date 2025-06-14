import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import sequelize from "./config/sequelize.js";
import { seed } from '../scripts/seedMunicipalities.js';
import "./models/index.js";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL");

    await sequelize.sync();

    await seed();

    app.listen(APP_PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${APP_PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a MySQL o iniciar servidor:", error);
    setTimeout(startServer, 5000);
  }
}

startServer();
