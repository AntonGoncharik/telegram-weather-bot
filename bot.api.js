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
            bot.sendMessage(chatId, strings.getString('introduction', 'en'), keyboardLanguages);
        } else {
            bot.sendMessage(chatId, strings.getString('hasUser', user.language));
        }
    } catch (error) {
        bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/reset/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            const user = await controller.removeUser(chatId);
            bot.sendMessage(chatId, strings.getString('reset', user.language));
        } else {
            bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

bot.onText(/\/name (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1].trim();

    try {
        const user = await controller.getUser(chatId);
        if (user) {
            const user = await controller.updateUser(chatId, { name: text });
            bot.sendMessage(chatId, `${strings.getString('greeting', user.language)} ${text}!`);
            setTimeout(() => {
                bot.sendMessage(chatId, strings.getString('location', user.language), getKeyboardLocation(user.language));
            }, 0);
        } else {
            bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        bot.sendMessage(chatId, strings.getString('error', 'en'));
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
                bot.sendMessage(chatId, strings.getString('enterName', user.language));
            } else {
                bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
            }
        } catch (error) {
            bot.sendMessage(chatId, strings.getString('error', 'en'));
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
            bot.sendMessage(chatId, strings.getString('end', user.language));
        } else {
            bot.sendMessage(chatId, strings.getString('hasNotUser', 'en'));
        }
    } catch (error) {
        bot.sendMessage(chatId, strings.getString('error', 'en'));
    }
});

module.exports = bot;