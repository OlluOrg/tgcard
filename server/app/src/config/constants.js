module.exports.constants = {
    HTTP_OK: 200,
    HTTP_BAD_REQUEST: 400,
    HTTP_NOT_FOUND: 404,
    HTTP_METHOD_NOT_ALLOWED: 405,

    ERROR_ACTION_REQUIRED: 'Action parameter is required',
    ERROR_INVALID_ACTION_FORMAT: 'Invalid action format. Use "controller.method"',
    ERROR_CONTROLLER_NOT_FOUND: 'Controller not found',
    ERROR_METHOD_NOT_FOUND: 'Method not found',
    ERROR_DATA_REQUIRED: 'Data is required for create',
    ERROR_ID_REQUIRED: 'ID is required',
    ERROR_ID_AND_DATA_REQUIRED: 'ID and data are required for update',
    ERROR_RESOURCE_NOT_FOUND: 'Resource not found',

    COLLECTION_USERS: 'users',
    COLLECTION_BUSINESS_CARDS: 'business_cards',
    COLLECTION_VIEW_HISTORY: 'view_history',

    MONGO_URI: 'mongodb://root:secret@mongodb:27017',
    MONGO_DB_NAME: 'businessCards',

    ACTION_DELIMITER: '.',

    CONTROLLER_USER: 'user',
    CONTROLLER_BUSINESS_CARD: 'businessCard',
    CONTROLLER_VIEW_HISTORY: 'viewHistory',

    METHOD_CREATE: 'create',
    METHOD_READ: 'read',
    METHOD_UPDATE: 'update',
    METHOD_DELETE: 'delete',
    METHOD_GET_VIEW: 'addView',
    METHOD_ADD_VIEW: 'getViews'
};