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
    // Используем агрегацию для объединения коллекций и фильтрации данных
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
        $match: {
          'viewHistory.userId': userId // Фильтруем по userId в viewHistory
        }
      },
      {
        $project: {
          viewHistory: 0 // Исключаем поле viewHistory из результата (необязательно)
        }
      }
    ]).exec();
};

const ViewHistory = mongoose.model('ViewHistory', viewHistorySchema);

module.exports = ViewHistory;