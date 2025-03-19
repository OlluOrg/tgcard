const User = require('../models/User');
const { constants } = require('../config/constants');

exports.create = async (req, res) => {
    const data = req.body.data;
    if (!data) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_DATA_REQUIRED, body:req.body, q: req.query, params : req.params });
    }

    try {
        const user = await User.createUser(data);
        res.json({ id: user._id });
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};

exports.read = async (req, res) => {
    const id = req.body.id;
    if (id) {
        const user = await User.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({ error: constants.ERROR_RESOURCE_NOT_FOUND });
        }
    } else {
        const users = await User.findAll();
        res.json(users);
    }
};

exports.update = async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    if (!id || !data) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_ID_AND_DATA_REQUIRED });
    }

    try {
        const result = await User.updateUser(id, data);
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
        const result = await User.deleteUser(id);
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        res.status(constants.HTTP_BAD_REQUEST).json({ error: error.message });
    }
};