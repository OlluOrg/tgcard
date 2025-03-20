const mongoose = require('mongoose');
const { constants } = require('./constants');

mongoose.connect(`${constants.MONGO_URI}/${constants.MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin', // Указываем базу данных для аутентификации
    auth: {
        username: 'root', // Логин
        password: 'secret' // Пароль
    }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;