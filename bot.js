import TelegramBot from 'node-telegram-bot-api';
import { handleWeatherCommand, handleCityCommand } from './services/telegramService.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Verify bot connection and token
bot.getMe()
    .then((botInfo) => {
        console.log(`Bot successfully connected: @${botInfo.username}`);
    })
    .catch((error) => {
        console.error('Failed to connect to Telegram API. Please check your bot token or network connection.', error);
        process.exit(1); // Exit the process if the bot can't connect
    });
async function setBotDescription() {
    try {
        await bot.setMyDescription(`
            This bot provides weather updates.
            Created for a test assignment at BobrAi.
            /weather city-name -> to get specific city weather info
            /city city-name -> to set default city
            `);
        console.log('Bot description updated successfully.');
    } catch (error) {
        console.error('Failed to update bot description:', error);
    }
}

// Call the function to set the description
setBotDescription();

bot.onText(/\/weather(?: (.+))?/, (msg) => {
    handleWeatherCommand(bot, msg);
});

bot.onText(/\/city(?: (.+))?/, (msg) => {
    handleCityCommand(bot, msg);
});

export default bot;
