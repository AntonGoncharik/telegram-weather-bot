const mongoose = require('mongoose');

const config = require('./config');
const bot = require('./bot.api');

const start = async () => {
    try {
        await mongoose.connect(config.dbURL, config.dbOptions);
        console.log('I am OK');
    } catch (error) {
        console.log(error);
    }
};

start();
