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
        required: false,
        default: null,
    },
    language: {
        type: String,
        index: true,
        unique: false,
        required: false,
        default: null,
    },
    latitude: {
        type: Number,
        index: true,
        unique: false,
        required: false,
        default: null,
    },
    longitude: {
        type: Number,
        index: true,
        unique: false,
        required: false,
        default: null,
    },
});

module.exports = mongoose.model('User', user);
