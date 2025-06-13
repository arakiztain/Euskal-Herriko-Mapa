import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a MySQL.");
  } catch (err) {
    console.error("❌ Error conectando a MySQL:", err.message);
    console.log("🔁 Reintentando conexión en 5 segundos...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

export default sequelize;
