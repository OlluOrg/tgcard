const mongoose = require('../config/database');
const { Schema } = mongoose;
const { constants } = require('../config/constants');

const TypeSectionEnum = {
    text: 0,
    blockLink: 1,
    divider: 2,
    video: 3,
    image: 4,
}

const SectionSchema = new Schema({
    id: { type: String, required: true },
    typeSectionEnum: { 
        type: Number, 
        required: true,
        enum: Object.values(TypeSectionEnum),
    },
    value: {
        type: Schema.Types.Mixed,
        required: false,
    },
    order: { type: Number, required: true },
}, { _id: false });

const businessCardSchema = new Schema({
    userId: { type: String, required: true },
    data: {
        id: { type: Schema.Types.Mixed, required: false },
        title: { type: String, required: false },
        sections: { type: [SectionSchema], default: [] },
    },
}, { 
    collection: constants.COLLECTION_BUSINESS_CARDS,
    timestamps: true,
});

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
    return this.find({ userId: id }).sort({ updatedAt: -1 });
};

// Метод для поиска всех визиток
businessCardSchema.statics.findAll = async function() {
    return this.find();
};

// Метод для обновления визитки
businessCardSchema.statics.updateCard = async function(id, data) {
    const card = await this.findById(id);
    if (!card) throw new Error("Card not found");
    console.log(data);
    card.data = data;
    return card.save();
};

// Метод для удаления визитки
businessCardSchema.statics.deleteCard = async function(id) {
    return this.deleteOne({ _id: id });
};

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;