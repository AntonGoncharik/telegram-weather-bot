const apiGet = require('./api');
const config = require('./config');

const weatherService = {
    getWeather: async (latitude, longitude) => {
        try {
            const result = await apiGet('/onecall', {
                params: {
                    appid: config.weatherApiToken,
                    lat: latitude,
                    lon: longitude,
                    exclude: 'minutely,hourly',
                    units: 'metric',
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(error);
        }
    },
};

module.exports = weatherService;