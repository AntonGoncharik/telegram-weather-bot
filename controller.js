const userModel = require('./model');

const Controller = {
    getUsers: async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
    getUser: async (telegramId) => {
        try {
            const user = await userModel.findOne({ telegramId });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    addUser: async (data) => {
        try {
            const user = await new userModel(data).save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateUser: async (telegramId, data) => {
        try {
            const user = await userModel.findOneAndUpdate({ telegramId }, data, { new: true, });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    removeUser: async (telegramId) => {
        try {
            const user = await userModel.findOneAndDelete({ telegramId });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
};

module.exports = Controller;