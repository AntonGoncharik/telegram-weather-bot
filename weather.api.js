const apiGet = require('./api');
const config = require('./config');

const weatherService = {
    getWeather: async (latitude, longitude, language) => {
        try {
            const result = await apiGet('https://api.openweathermap.org/data/2.5/onecall', {
                params: {
                    appid: config.weatherApiToken,
                    lat: latitude,
                    lon: longitude,
                    exclude: 'minutely,daily',
                    units: 'metric',
                    lang: language,
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(error);
        }
    },
    getWeatherIcon: async (id) => {
        try {
            const result = await apiGet(`https://openweathermap.org/img/wn/${id}@2x.png`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        }
    },
};

module.exports = weatherService;