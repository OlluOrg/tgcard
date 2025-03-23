require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { BOT_TOKEN, WEB_URL } = process.env;
const token = BOT_TOKEN;
const webUrl = WEB_URL;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Нажми на кнопку чтобы создать визитку", {
    "reply_markup": {
      "keyboard": [[{text: 'Открыть приложение', web_app: {url: webUrl}}]]
    }
  });
});
