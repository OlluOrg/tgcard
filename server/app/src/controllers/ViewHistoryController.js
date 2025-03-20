const ViewHistory = require('../models/ViewHistory');
const { constants } = require('../config/constants');

exports.addView = async (req, res) => {
    const { userId, cardId } = req.body;
    if (!userId || !cardId) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: 'user_id and card_id are required', body:req.body, query:req.query});
    }

    try {
        an = await ViewHistory.addOrUpdateView(userId, cardId);
        res.json({ status: 'success' , "an": an});
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};

exports.getViews = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: 'user_id is required' });
    }

    try {
        const views = await ViewHistory.getViewsByUser(userId);
        res.json(views);
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};