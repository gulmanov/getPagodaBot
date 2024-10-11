import express from 'express';
import './config/dotenv.js';
import sequelize from './config/dbConfig.js';
import logsRoute from './routes/logsRoute.js';
import './scripts/cacheCleanup.js'; // Run cache cleanup script
import bot from './bot.js';

const app = express();
app.use(express.json());
app.use(logsRoute);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
