import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client
  .connect()
  .then(() => console.log("Database connection successfully"))
  .catch((err) => console.log("Error connecting database", err.stack));
export default client;
