import { Sequelize } from 'sequelize';
import dotenv from './dotenv.js';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Disable SQL query logging in console
  }
);

export default sequelize;
