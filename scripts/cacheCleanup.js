import { WeatherCache } from '../models/WeatherCache.js';

// Function to clean outdated cache (older than 10 minutes)
export const cleanOldCache = async () => {
  const expirationTime = 10 * 60 * 1000; // 10 minutes
  try {
    const outdatedEntries = await WeatherCache.findAll({
      where: {
        last_updated: {
          [Sequelize.Op.lt]: new Date(Date.now() - expirationTime),
        },
      },
    });
    for (const entry of outdatedEntries) {
      await entry.destroy();
    }
    console.log('Old cache cleaned up.');
  } catch (error) {
    console.error('Error cleaning old cache:', error);
  }
};

// Set interval to clean cache every 10 minutes (600000 ms)
setInterval(cleanOldCache, 600000); // Or use cron job for better scalability
