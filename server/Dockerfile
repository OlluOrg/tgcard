# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Устанавливаем зависимости
RUN npm install

# Копируем package.json и package-lock.json
COPY app/package.json app/package-lock.json ./

# Копируем исходный код приложения
COPY app/ .

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]