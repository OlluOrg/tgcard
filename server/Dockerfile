# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Копируем package.json
COPY app/package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY app/ .

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]