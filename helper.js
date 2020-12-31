const strings = require('./localization');
const config = require('./config');

const helper = {
    getFormattedWeather: (weather, user) => {
        const weatherTextList = [];

        weatherTextList.push(`${strings.getString('currentWeather', user.language)}:`);

        weatherTextList.push(`*
        ${strings.getString('date', user.language)}: ${new Date(weather.current.dt * 1000).toJSON().slice(0, 10).split('-').reverse().join('/')} ${new Date(weather.current.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })}
        ${strings.getString('temp', user.language)}: ${weather.current.temp} °C
        ${strings.getString('tempFeelsLike', user.language)}: ${weather.current.feels_like} °C
        ${strings.getString('pressure', user.language)}: ${(weather.current.pressure / config.coefficientPressure).toFixed()} ${strings.getString('mmHg', user.language)}
        ${strings.getString('humidity', user.language)}: ${weather.current.humidity} %
        ${strings.getString('clouds', user.language)}: ${weather.current.clouds} %
        ${strings.getString('windSpeed', user.language)}: ${weather.current.wind_speed} ${strings.getString('metreSec', user.language)}
        ${strings.getString('windDeg', user.language)}: ${helper.getDirection(weather.current.wind_deg, user.language)}
        ${strings.getString('visibility', user.language)}: ${weather.current.visibility} ${strings.getString('metres', user.language)}
        ${strings.getString('uvi', user.language)}: ${weather.current.uvi}
        ${strings.getString('description', user.language)}: ${weather.current.weather.map((elem) => elem.description).toString()}`);

        // weatherTextList.push(`${strings.getString('forecastWeather', user.language)}:`);

        // weather.hourly.forEach((item, index) => {
        //     if (index < 25 && index > 0) {
        //         weatherTextList.push(`
        //         *
        //         ${strings.getString('date', user.language)}: ${new Date(item.dt * 1000).toJSON().slice(0, 10).split('-').reverse().join('/')} ${new Date(item.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })}
        //         ${strings.getString('temp', user.language)}: ${item.temp} °C
        //         ${strings.getString('tempFeelsLike', user.language)}: ${item.feels_like} °C
        //         ${strings.getString('pressure', user.language)}: ${(item.pressure / config.coefficientPressure).toFixed()} ${strings.getString('mmHg', user.language)}
        //         ${strings.getString('humidity', user.language)}: ${item.humidity} %
        //         ${strings.getString('clouds', user.language)}: ${item.clouds} %
        //         ${strings.getString('windSpeed', user.language)}: ${item.wind_speed} ${strings.getString('metreSec', user.language)}
        //         ${strings.getString('windDeg', user.language)}: ${helper.getDirection(item.wind_deg, user.language)}
        //         ${strings.getString('visibility', user.language)}: ${item.visibility} ${strings.getString('metres', user.language)}
        //         ${strings.getString('uvi', user.language)}: ${item.uvi}
        //         ${strings.getString('description', user.language)}: ${item.weather.map((elem) => elem.description).toString()}
        //         `);
        //     }
        // });

        return weatherTextList;
    },
    getDirection: (angle, language) => {
        const directions = [
            strings.getString('north', language),
            strings.getString('northWest', language),
            strings.getString('west', language),
            strings.getString('southWest', language),
            strings.getString('south', language),
            strings.getString('southEast', language),
            strings.getString('east', language),
            strings.getString('northEast', language)
        ];

        return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
    },
};

module.exports = helper;