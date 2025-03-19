const mongoose = require('../config/database');
const { constants } = require('../config/constants');

const userSchema = new mongoose.Schema({
    tgId: { type: String, required: true, unique: true },
    data: {}
}, { collection: constants.COLLECTION_USERS });

// Метод для создания пользователя
userSchema.statics.createUser = async function(data) {
    const user = new this(data);
    await user.save();
    return user;
};

// Метод для поиска пользователя по ID
userSchema.statics.findById = async function(id) {
    return this.findOne({ _id: id });
};

// Метод для поиска всех пользователей
userSchema.statics.findAll = async function() {
    return this.find();
};

// Метод для обновления пользователя
userSchema.statics.updateUser = async function(id, data) {
    return this.updateOne({ _id: id }, { data: data });
};

// Метод для удаления пользователя
userSchema.statics.deleteUser = async function(id) {
    return this.deleteOne({ _id: id });
};

const User = mongoose.model('User', userSchema);

module.exports = User;