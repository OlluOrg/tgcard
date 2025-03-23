const mongoose = require('../config/database');
const { constants } = require('../config/constants');
const BusinessCard = require('./BusinessCard');

const viewHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true},
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: constants.COLLECTION_BUSINESS_CARDS, required: true},
    lastViewedAt: { type: Date, default: Date.now }
}, { collection: constants.COLLECTION_VIEW_HISTORY });

// Уникальный индекс для userId и cardId
viewHistorySchema.index({ userId: 1, cardId: 1 }, { unique: true });

// Метод для добавления или обновления записи о просмотре
viewHistorySchema.statics.addOrUpdateView =  function(userId, cardId) {
    const an = this.updateOne(
        { userId: userId, cardId: cardId },
        { lastViewedAt: new Date()  },
        { upsert: true }
    );

    // Удаляем старые записи, если их больше 100
    const count =  this.countDocuments({ userId: userId });
    if (count > 100) {
        const oldestView =  this.findOne({ userId: userId })
            .sort({ lastViewedAt: 1 })
            .select({ _id: 1 })
            .exec();
        if (oldestView) {
             this.deleteOne({ _id: oldestView._id });
        }
    }
    return an;
};

// Метод для получения истории просмотров по userId
viewHistorySchema.statics.getViewsByUser = function(userId) {
    return BusinessCard.aggregate([
        {
            $lookup: {
                from: constants.COLLECTION_VIEW_HISTORY, // Имя коллекции viewHistory
                localField: '_id',       // Поле в businessCardSchema для соединения
                foreignField: 'cardId',   // Поле в viewHistorySchema для соединения
                as: "viewHistory"          // Имя поля, содержащего массив viewHistory
            }
        },
        {
            $unwind: "$viewHistory" // Разворачиваем массив viewHistory
        },
        {
            $match: {
                'viewHistory.userId': userId // Фильтруем по userId в viewHistory
            }
        },
        {
            $sort: {
                'viewHistory.lastViewedAt': -1 // Сортировка по полю lastViewedAt (по убыванию)
            }
        },
        {
            $group: {
                _id: "$_id", // Группируем обратно по _id бизнес-карты
                businessCardData: { $first: "$$ROOT" }, // Сохраняем данные бизнес-карты
                lastViewedAt: { $first: "$viewHistory.lastViewedAt" } // Сохраняем только lastViewedAt
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        "$businessCardData", // Все поля из businessCardSchema
                        { lastViewedAt: "$lastViewedAt" } // Добавляем lastViewedAt
                    ]
                }
            }
        },
        {
            $project: {
                viewHistory: 0 // Убираем поле viewHistory из результата
            }
        }
    ]).exec();
};

const ViewHistory = mongoose.model('ViewHistory', viewHistorySchema);

module.exports = ViewHistory;