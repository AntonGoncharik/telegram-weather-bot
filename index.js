const mongoose = require('mongoose');
const cron = require('node-cron');

const config = require('./config');
const bot = require('./bot.api');
const controller = require('./controller');
const weatherService = require('./weather.api');
const strings = require('./localization');

const sendWeather = async () => {
    try {
        const users = await controller.getUsers();

        for (const user of users) {
            try {
                if (user.latitude && user.longitude) {
                    const result = await weatherService.getWeather(user.latitude, user.longitude);

                    const weatherTextList = getFormattedWeather(result, user);

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

const getFormattedWeather = (weather, user) => {
    const weatherTextList = [];

    weatherTextList.push(`${strings.getString('currentWeather', user.language)}:`);

    weatherTextList.push(`${strings.getString('date', user.language)}: ${new Date(weather.current.dt * 1000).toLocaleDateString()}
    ${strings.getString('sunrise', user.language)}: ${new Date(weather.current.sunrise * 1000).toLocaleTimeString()}
    ${strings.getString('sunset', user.language)}: ${new Date(weather.current.sunset * 1000).toLocaleTimeString()}
    ${strings.getString('temp', user.language)}: ${weather.current.temp} С
    ${strings.getString('tempFeelsLike', user.language)}: ${weather.current.feels_like} С
    ${strings.getString('pressure', user.language)}: ${weather.current.pressure}
    ${strings.getString('humidity', user.language)}: ${weather.current.humidity} %
    ${strings.getString('clouds', user.language)}: ${weather.current.clouds} %
    `);

    weatherTextList.push(`${strings.getString('forecastWeather', user.language)}:`);

    weather.daily.forEach((item) => {
        weatherTextList.push(`${strings.getString('date', user.language)}: ${new Date(item.dt * 1000).toLocaleDateString()}
        ${strings.getString('sunrise', user.language)}: ${new Date(item.sunrise * 1000).toLocaleTimeString()}
        ${strings.getString('sunset', user.language)}: ${new Date(item.sunset * 1000).toLocaleTimeString()}
        ${strings.getString('tempMin', user.language)}: ${item.temp.min} С
        ${strings.getString('tempMax', user.language)}: ${item.temp.max} С
        ${strings.getString('tempMorn', user.language)}: ${item.temp.morn} С
        ${strings.getString('tempDay', user.language)}: ${item.temp.day} С
        ${strings.getString('tempEve', user.language)}: ${item.temp.eve} С
        ${strings.getString('tempNight', user.language)}: ${item.temp.night} С
        ${strings.getString('tempFeelsLikeMorn', user.language)}: ${item.feels_like.morn} С
        ${strings.getString('tempFeelsLikeDay', user.language)}: ${item.feels_like.day} С
        ${strings.getString('tempFeelsLikeEve', user.language)}: ${item.feels_like.eve} С
        ${strings.getString('tempFeelsLikeNight', user.language)}: ${item.feels_like.night} С
        ${strings.getString('pressure', user.language)}: ${item.pressure}
        ${strings.getString('humidity', user.language)}: ${item.humidity} %
        ${strings.getString('clouds', user.language)}: ${item.clouds} %
        `);
    });

    return weatherTextList;
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
