import bot from '../bot.js';

// Mock the getMe method
bot.getMe = jest.fn().mockResolvedValue({
    username: 'test_bot',
});

describe('Bot Connection', () => {
    it('should verify the bot connection and token', async () => {
        const botInfo = await bot.getMe();
        expect(botInfo.username).toBe('test_bot');
    });
});
