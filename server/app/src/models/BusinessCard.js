const mongoose = require('../config/database');
const { constants } = require('../config/constants');

const businessCardSchema = new mongoose.Schema({
    userId:{ type: String, required: true},
    data: {}
}, { collection: constants.COLLECTION_BUSINESS_CARDS });

// Метод для создания визитки
businessCardSchema.statics.createCard = async function(data) {
    const card = new this(data);
    await card.save();
    return card;
};

// Метод для поиска визитки по ID
businessCardSchema.statics.findById = async function(id) {
    return this.findOne({ _id: id });
};

// Метод для поиска визиток userId
businessCardSchema.statics.findByUserId = async function(id) {
    return this.find({ userId: id });
};

// Метод для поиска всех визиток
businessCardSchema.statics.findAll = async function() {
    return this.find();
};

// Метод для обновления визитки
businessCardSchema.statics.updateCard = async function(id, data) {
    return this.updateOne({ _id: id }, { data: data });
};

// Метод для удаления визитки
businessCardSchema.statics.deleteCard = async function(id) {
    return this.deleteOne({ _id: id });
};

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;