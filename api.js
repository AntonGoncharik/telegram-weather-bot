const axios = require('axios');

const config = require('./config');

const axiosInstance = axios.create({
    baseURL: config.weatherApiUrl,
    headers: { 'Content-Type': 'application/json', },
});

const apiGet = (path, params) => {
    return axiosInstance.get(path, params);
};

module.exports = apiGet;