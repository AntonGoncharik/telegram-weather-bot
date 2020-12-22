const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const strings = require('./localization');

const bot = new TelegramBot(config.telegramApiToken, { polling: true });

const keyboardLanguages = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'English', callback_data: 'en' }],
            [{ text: 'Русский', callback_data: 'ru' }],
        ]
    }
};

const keyboardLocation = {
    reply_markup: {
        keyboard: [
            [{ text: strings.buttonLocation, request_location: true, }],
        ],
        resize_keyboard: true,
    }
};

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, strings.introduction, keyboardLanguages);
});

bot.onText(/\/reset/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, strings.reset);
    // reset db
});

bot.onText(/\/name (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];
    bot.sendMessage(chatId, `${strings.greeting} ${text}!`);
    bot.sendMessage(chatId, strings.location, keyboardLocation);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'en' || query.data === 'ru') {
        let selectedLanguage = '';

        if (query.data === 'en') {
            selectedLanguage = 'en';
        }
        if (query.data === 'ru') {
            selectedLanguage = 'ru';
        }

        bot.sendMessage(chatId, strings.enterName);
    }
});

bot.on('location', (query) => {
    console.log(query.location.latitude, query.location.longitude)
});

module.exports = bot;