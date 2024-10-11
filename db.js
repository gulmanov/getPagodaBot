import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import TelegramRequest from './models/TelegramRequest.js';
import WeatherCache from './models/WeatherCache.js';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'postgres',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await TelegramRequest.sync();
    await WeatherCache.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
