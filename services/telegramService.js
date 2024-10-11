import { getWeatherData } from './weatherService.js';
import { TelegramRequest } from '../models/TelegramRequest.js';
import { User } from '../models/User.js'

// Function to handle weather command
export const handleWeatherCommand = async (bot, message) => {
  const chatId = message.chat.id;
  let cityName = message.text.split(' ')[1]; // extract city
  let response = 'Please specify a city.';

  if (!cityName) {
    cityName = await User.getCity(message.from.id + "");
    if (!cityName) {
      await TelegramRequest.create({
        telegram_user_id: message.from.id,
        telegram_username: message.from.username || message.from.first_name || message.from.last_name,
        user_message: message.text,
        our_response: response,
        time: new Date(),
      });
      return bot.sendMessage(chatId, response);
    }
  }

  try {
    const weatherData = await getWeatherData(cityName);

    const response = `
      Weather in ${cityName}:
      - Temperature: ${weatherData.current.temp_c}°C
      - Feels like: ${weatherData.current.feelslike_c}°C
      - Condition: ${weatherData.current.condition.text}
      - Humidity: ${weatherData.current.humidity}%
      - Wind speed: ${weatherData.current.wind_kph} kph
    `;

    // Log the request in the database
    await TelegramRequest.create({
      telegram_user_id: message.from.id,
      telegram_username: message.from.username || message.from.first_name || message.from.last_name,
      user_message: message.text,
      our_response: response,
      time: new Date(),
    });

    bot.sendMessage(chatId, response);
  } catch (error) {
    bot.sendMessage(chatId, 'Error fetching weather data. Please try again.');
  }


};

// Function to handle city command
export const handleCityCommand = async (bot, message) => {
  const chatId = message.chat.id;
  const cityName = message.text.split(' ')[1]; // extract city
  let response = 'Please specify a city.';

  if (!cityName) {
    await TelegramRequest.create({
      telegram_user_id: message.from.id,
      telegram_username: message.from.username || message.from.first_name || message.from.last_name,
      user_message: message.text,
      our_response: response,
      time: new Date(),
    });
    return bot.sendMessage(chatId, response);
  }

  try {
    User.setCity(message.from.id, cityName, message.from.first_name, message.from.last_name)
    response = 'Default city is setted to ' + cityName;
    // Log the request in the database
    await TelegramRequest.create({
      telegram_user_id: message.from.id,
      telegram_username: message.from.username || message.from.first_name || message.from.last_name,
      user_message: message.text,
      our_response: response,
      time: new Date(),
    });
    return bot.sendMessage(chatId, response);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, 'Please try later again.');
  }
};
