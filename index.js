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
            if (user.latitude && user.longitude) {
                const result = await weatherService.getWeather(user.latitude, user.longitude);

                const text = getFormattedWeather(result, user);
                bot.sendMessage(user.telegramId, text);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const getFormattedWeather = (weather, user) => {
    const currentWeather =
        `${strings.getString('currentWeather', user.language)}:
        ${strings.getString('date', user.language)}: ${new Date(weather.current.dt * 1000).toLocaleDateString()}
        ${strings.getString('sunrise', user.language)}: ${new Date(weather.current.sunrise * 1000).toLocaleTimeString()}
        ${strings.getString('sunset', user.language)}: ${new Date(weather.current.sunset * 1000).toLocaleTimeString()}
        ${strings.getString('temp', user.language)}: ${weather.current.temp} С
        ${strings.getString('tempFeelsLike', user.language)}: ${weather.current.feels_like} С
        ${strings.getString('pressure', user.language)}: ${weather.current.pressure}
        ${strings.getString('humidity', user.language)}: ${weather.current.humidity} %
        ${strings.getString('clouds', user.language)}: ${weather.current.clouds} %
        `;

    const forecastWeather = weather.daily.map((item) => {
        return (
            `${strings.getString('forecastWeather', user.language)}:
            ${strings.getString('date', user.language)}: ${new Date(item.dt * 1000).toLocaleDateString()}
            ${strings.getString('sunrise', user.language)}: ${new Date(item.sunrise * 1000).toLocaleTimeString()}
            ${strings.getString('sunset', user.language)}: ${new Date(item.sunset * 1000).toLocaleTimeString()}
            ${strings.getString('temp', user.language)}: ${weather.current.temp} С
            ${strings.getString('tempFeelsLike', user.language)}: ${weather.current.feels_like} С
            ${strings.getString('pressure', user.language)}: ${weather.current.pressure}
            ${strings.getString('humidity', user.language)}: ${weather.current.humidity} %
            ${strings.getString('clouds', user.language)}: ${weather.current.clouds} %
            `
            {
            date: item.dt,
                sunrise: item.sunrise,
                    sunset: item.sunset,
                        tempMin: item.temp.min,
                            tempMax: item.temp.max,
                                tempMorn: item.temp.morn,
                                    tempDay: item.temp.day,
                                        tempEve: item.temp.eve,
                                            tempNight: item.temp.night,
                                                tempFeelsLikeMorn: item.feels_like.morn,
                                                    tempFeelsLikeDay: item.feels_like.day,
                                                        tempFeelsLikeEve: item.feels_like.eve,
                                                            tempFeelsLikeNight: item.feels_like.night,
                                                                pressure: item.pressure,
                                                                    humidity: item.humidity,
                                                                        clouds: item.clouds,
            }
        )
});

return currentWeather;
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
