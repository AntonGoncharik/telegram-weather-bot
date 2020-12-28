const axios = require('axios');

const config = require('./config');

const axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json', },
});

const apiGet = (path, params) => {
    return axiosInstance.get(path, params);
};

module.exports = apiGet;