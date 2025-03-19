Для бота используется библиотека node-telegram-bot-api.

В папку tg-bot добавить файл `.env`, в нем указать токен бота и url
на реакт приложение. 
```
TELEGRAM_BOT_TOKEN=ТОКЕН
WEB_URL=URL
```

Для разработки можно использовать cloudflared для создания туннеля,
так как телеграмм поддерживает только https ссылки.

```
npm install -g cloudflared
cloudflared tunnel --url http://localhost:3000
```

Затем занести предоставленную ссылку в `.env` файл.

Для старта использовать команду `npm start`

"start": "set HTTPS=true&&react-scripts start",