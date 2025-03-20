require('dotenv').config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

const webUrl = process.env.WEB_URL;

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка заполнения формы', {
            reply_markup: {
                keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webUrl}}]
                ]
            }
        });
    }
});