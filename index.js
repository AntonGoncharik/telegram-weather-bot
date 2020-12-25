const mongoose = require('mongoose');
const cron = require('node-cron');

const config = require('./config');
const bot = require('./bot.api');

const start = async () => {
    try {
        await mongoose.connect(config.dbURL, config.dbOptions);

        cron.schedule(config.schedule, () => {

        });
    } catch (error) {
        console.log(error);
    }
};

start();
