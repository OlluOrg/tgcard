const mongoose = require('../config/database');
const { Schema } = mongoose;
const { constants } = require('../config/constants');
const { ForbiddenError, NotFoundError } = require('../errors/errors.js')

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
    isArchived: { type: Boolean, required: true },
}, { 
    collection: constants.COLLECTION_BUSINESS_CARDS,
    timestamps: true,
});

// Метод для создания визитки
businessCardSchema.statics.createCard = async function(data) {
    data.isArchived = false;
    const card = new this(data);
    await card.save();
    return card;
};

// Метод для поиска визитки по ID
businessCardSchema.statics.findById = async function(id) {
    const card = await this.findOne({ _id: id }).lean();
    console.log(card);

    if (!card) {
        throw new NotFoundError("Визитка не найдена");
    }

    if (card.isArchived) {
        throw new ForbiddenError("Визитка архивированна");
    }

    return card;
};

// Метод для поиска визиток userId
businessCardSchema.statics.findByUserId = async function(id) {
    return this.find({ userId: id, isArchived: false }).sort({ updatedAt: -1 });
};

// Метод для поиска всех визиток
businessCardSchema.statics.findAll = async function() {
    return this.find();
};

// Метод для обновления визитки
businessCardSchema.statics.updateCard = async function(id, data) {
    const card = await this.findById(id);
    if (!card) throw new Error("Card not found");
    card.data = data;
    return card.save();
};

// Метод для удаления визитки
businessCardSchema.statics.deleteCard = async function(id) {
    const card = await this.findById(id);
    if (!card) throw new Error("Card not found");
    card.isArchived = true;
    return card.save();
};

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;