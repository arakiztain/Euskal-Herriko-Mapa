import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import sequelize from "./config/sequelize.js";
import "./models/index.js";

dotenv.config();

const APP_PORT = process.env.APP_PORT;
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

sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado a MySQL");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MySQL:", err);
  });