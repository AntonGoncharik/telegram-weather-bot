const TelegramBot = require('node-telegram-bot-api');

const controller = require('./controller');
const config = require('./config');
const strings = require('./localization');
const weatherService = require('./weather.api');

const bot = new TelegramBot(config.telegramApiToken, { polling: true });

const keyboardLanguages = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'English', callback_data: 'en' }],
            [{ text: 'Русский', callback_data: 'ru' }],
        ]
    }
};

const getKeyboardLocation = (language) => {
    return (
        {
            reply_markup: {
                keyboard: [
                    [{ text: strings.getString('buttonLocation', language), request_location: true, }],
                ],
                resize_keyboard: true,
            }
        }
    )
};

bot.onText(/\/start/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (!user) {
            const user = await controller.addUser({ telegramId: chatId });
            await bot.sendMessage(chatId, strings.getString('introduction', 'en'), keyboardLanguages);
        } else {
            await bot.sendMessage(chatId, strings.getString('hasUser', user.language));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/reset/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            const user = await controller.removeUser(chatId);
            await bot.sendMessage(chatId, strings.getString('reset', user.language));
        } else {
            await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/name (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1].trim();

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            if (text) {
                const user = await controller.updateUser(chatId, { name: text });
                await bot.sendMessage(chatId, `${strings.getString('greeting', user.language)} ${text}!`);
                await bot.sendMessage(chatId, strings.getString('location', user.language), getKeyboardLocation(user.language));
            } else {
                await bot.sendMessage(chatId, strings.getString('hasNotName', user.language));
            }
        } else {
            await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/language/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            await bot.sendMessage(chatId, strings.getString('introduction', user.language), keyboardLanguages);
        } else {
            await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/location/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            await bot.sendMessage(chatId, strings.getString('location', user.language), getKeyboardLocation(user.language));
        } else {
            await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'en' || query.data === 'ru') {
        let selectedLanguage = '';

        if (query.data === 'en') {
            selectedLanguage = 'en';
        }
        if (query.data === 'ru') {
            selectedLanguage = 'ru';
        }

        try {
            const user = await controller.getUser(chatId);
            if (user) {
                const user = await controller.updateUser(chatId, { language: selectedLanguage });
                if (!user.name) {
                    await bot.sendMessage(chatId, strings.getString('enterName', user.language));
                }
            } else {
                await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
            }
        } catch (error) {
            await bot.sendMessage(chatId, strings.getString('error', 'en'));
        }
    }
});

bot.on('location', async (query) => {
    const chatId = query.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            const user = await controller.updateUser(chatId, {
                latitude: query.location.latitude,
                longitude: query.location.longitude,
            });
            await bot.sendMessage(chatId, strings.getString('end', user.language));
        } else {
            await bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        await bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

module.exports = bot;