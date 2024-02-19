import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
