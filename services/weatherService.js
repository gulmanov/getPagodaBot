import { WeatherCache } from '../models/WeatherCache.js';
import axios from 'axios';

export const getWeatherData = async (cityName) => {
  try {
    // Check cache first
    const cachedData = await WeatherCache.findOne({ where: { city_name: cityName } });
    if (cachedData) {
      const cacheAge = new Date() - new Date(cachedData.last_updated);
      if (cacheAge < 5 * 60 * 1000) { // 5 minutes cache validity
        console.log(`Serving from cache: ${cityName}`);
        return JSON.parse(cachedData.raw_data);
      } else {
        await cachedData.destroy(); // Remove stale cache
      }
    }

    // Fetch from WeatherAPI if no cache or stale cache
    // const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: cityName,
      },
    });
    console.log(response)

    // Save new data to cache
    await WeatherCache.create({
      city_name: cityName,
      raw_data: JSON.stringify(response.data),
      last_updated: new Date(),
    });

    console.log(`Weather data fetched from API: ${cityName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
