const BusinessCard = require('../models/BusinessCard');
const { constants } = require('../config/constants');

exports.create = async (req, res) => {
    const data = req.body.data;
    if (!data) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_DATA_REQUIRED });
    }

    try {
        const card = await BusinessCard.createCard(data);
        res.json({ id: card._id });
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};

exports.read = async (req, res) => {
    const id = req.body.id;
    const userId = req.body.userId;
    if (id) {
        const card = await BusinessCard.findById(id);
        if (card) {
            res.json(card);
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({ error: constants.ERROR_RESOURCE_NOT_FOUND });
        }
    } else if (userId) {
        const card = await BusinessCard.findByUserId(userId);
        if (card) {
            res.json(card);
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({ error: constants.ERROR_RESOURCE_NOT_FOUND });
        }
    } else {
        const cards = await BusinessCard.findAll();
        res.json(cards);
    }
};

exports.update = async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    if (!id || !data) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_ID_AND_DATA_REQUIRED });
    }

    try {
        const result = await BusinessCard.updateCard(id, data);
        res.json({ modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_ID_REQUIRED });
    }

    try {
        const result = await BusinessCard.deleteCard(id);
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};