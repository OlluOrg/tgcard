require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { BOT_TOKEN } = process.env;
const token = BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Нажми на кнопку и получишь эмоцию.", {
    "reply_markup": {
      "keyboard": [[{ text: "Получить эмоцию" }]]
    }
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toString().toLowerCase() === "получить эмоцию") {
    const emotions = ['😀', '😂', '🤣', '😊', '😍', '😒', '😭', '😠'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    bot.sendMessage(chatId, randomEmotion);
  }
});

console.log('Бот успешно запущен...');
