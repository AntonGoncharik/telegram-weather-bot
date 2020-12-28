const strings = require('./localization');

const helper = {
    getFormattedWeather: (weather, user) => {
        const weatherTextList = [];

        weatherTextList.push(`${strings.getString('currentWeather', user.language)}:`);

        weatherTextList.push(`${strings.getString('date', user.language)}: ${new Date(weather.current.dt * 1000).toJSON().slice(0, 10).split('-').reverse().join('/')} ${new Date(weather.current.dt * 1000).toLocaleTimeString('ru-RU', { hour12: false })}
        ${strings.getString('temp', user.language)}: ${weather.current.temp} С
        ${strings.getString('tempFeelsLike', user.language)}: ${weather.current.feels_like} С
        ${strings.getString('pressure', user.language)}: ${weather.current.pressure} ${strings.getString('hPa', user.language)}
        ${strings.getString('humidity', user.language)}: ${weather.current.humidity} %
        ${strings.getString('clouds', user.language)}: ${weather.current.clouds} %
        ${strings.getString('windSpeed', user.language)}: ${weather.current.wind_speed} ${strings.getString('metreSec', user.language)}
        ${strings.getString('description', user.language)}: ${weather.current.weather.map((elem) => elem.description).toString()}`);

        weatherTextList.push(`${strings.getString('forecastWeather', user.language)}:`);

        weather.hourly.forEach((item, index) => {
            if (index < 25 && index > 0) {
                weatherTextList.push(`${strings.getString('date', user.language)}: ${new Date(item.dt * 1000).toJSON().slice(0, 10).split('-').reverse().join('/')} ${new Date(item.dt * 1000).toLocaleTimeString('ru-RU', { hour12: false })}
                ${strings.getString('temp', user.language)}: ${item.temp} С
                ${strings.getString('tempFeelsLike', user.language)}: ${item.feels_like} С
                ${strings.getString('pressure', user.language)}: ${item.pressure} ${strings.getString('hPa', user.language)}
                ${strings.getString('humidity', user.language)}: ${item.humidity} %
                ${strings.getString('clouds', user.language)}: ${item.clouds} %
                ${strings.getString('windSpeed', user.language)}: ${item.wind_speed} ${strings.getString('metreSec', user.language)}
                ${strings.getString('description', user.language)}: ${item.weather.map((elem) => elem.description).toString()}
                `);
            }
        });

        return weatherTextList;
    },
};

module.exports = helper;