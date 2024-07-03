import "dotenv/config.js";
import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  password: process.env.POSTGRES_PASSWORD,
  port: 5431,
  logging:false,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  ssl: process.env.NODE_ENV == "production" ? true : false,
  typeValidation: true,
  pool: {
    max: 10,
  },
});
