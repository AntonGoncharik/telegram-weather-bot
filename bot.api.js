const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');

const bot = new TelegramBot(config.telegramApiToken, { polling: true });

const keyboardLanguages = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'English', callback_data: 'en' }],
            [{ text: 'Russian', callback_data: 'ru' }],
        ]
    }
};

const keyboardLocation = {
    reply_markup: {
        keyboard: [
            [{ text: 'Location', request_location: true, }],
        ],
        resize_keyboard: true,
    }
};

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    bot.sendMessage(chatId, text, keyboardLanguages);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    // language
    let selectedLanguage = '';

    if (query.data === 'en') {
        selectedLanguage = 'en';
    }
    if (query.data === 'ru') {
        selectedLanguage = 'ru';
    }

    bot.sendMessage(chatId, selectedLanguage);
});

bot.on('location', (query) => {
    console.log(query)
});

module.exports = bot;