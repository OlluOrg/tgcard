const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { constants } = require('./src/config/constants');
const userController = require('./src/controllers/UserController');
const businessCardController = require('./src/controllers/BusinessCardController');
const viewHistoryController = require('./src/controllers/ViewHistoryController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    const action = req.query.action || req.body.action;
    if (!action) {
        return res.status(constants.HTTP_BAD_REQUEST).json({ error: constants.ERROR_ACTION_REQUIRED, body:req.body, query:req.query });
    }

    const [controllerName, method] = action.split('.');
    let controller;

    switch (controllerName) {
        case 'user':
            controller = userController;
            break;
        case 'businessCard':
            controller = businessCardController;
            break;
        case 'viewHistory':
            controller = viewHistoryController;
            break;
        default:
            return res.status(constants.HTTP_NOT_FOUND).json({ error: constants.ERROR_CONTROLLER_NOT_FOUND });
    }

    if (controller[method]) {
        controller[method](req, res);
    } else {
        res.status(constants.HTTP_NOT_FOUND).json({ error: constants.ERROR_METHOD_NOT_FOUND });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});