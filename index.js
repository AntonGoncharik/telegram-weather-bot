const mongoose = require('mongoose');
const cron = require('node-cron');

const config = require('./config');
const bot = require('./bot.api');
const controller = require('./controller');
const weatherService = require('./weather.api');
const strings = require('./localization');
const helper = require('./helper');

const sendWeather = async () => {
    try {
        const users = await controller.getUsers();

        for (const user of users) {
            try {
                if (user.latitude && user.longitude) {
                    const result = await weatherService.getWeather(user.latitude, user.longitude);

                    const weatherTextList = helper.getFormattedWeather(result, user);

                    for (const item of weatherTextList) {
                        await bot.sendMessage(user.telegramId, item);
                    }
                }
            } catch (error) {
                bot.sendMessage(user.telegramId, strings.getString('error', user.language));
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const start = async () => {
    try {
        await mongoose.connect(config.dbURL, config.dbOptions);
        // cron.schedule(config.schedule, sendWeather);
        sendWeather();
    } catch (error) {
        console.log(error);
    }
};

start();
