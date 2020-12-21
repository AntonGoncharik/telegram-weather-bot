const mongoose = require('mongoose');

const user = new mongoose.Schema({
    telegramId: {
        type: String,
        index: true,
        unique: true,
        required: true,
        default: null,
    },
    name: {
        type: String,
        index: true,
        unique: false,
        required: true,
        default: null,
    },
    city: {
        type: String,
        index: true,
        unique: false,
        required: true,
        default: null,
    },
    language: {
        type: String,
        index: true,
        unique: false,
        required: true,
        default: null,
    },
});

module.exports = mongoose.model('User', user);
