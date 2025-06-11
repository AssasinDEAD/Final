# Используем Node.js 22
FROM node:22

# Задаём рабочую директорию
WORKDIR /frontend

# Копируем package.json и package-lock.json (если есть)
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код фронтенда
COPY frontend ./

# Открываем порт для фронтенда
EXPOSE 80

# Команда для запуска в режиме разработки (подгоните под ваш стартап-скрипт, если требуется)
CMD ["npm", "run", "dev"]
