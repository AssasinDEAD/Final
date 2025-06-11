# Используем Node.js 22
FROM node:22

# Устанавливаем глобально sequelize-cli, если это необходимо
RUN npm install -g sequelize-cli

# Задаём рабочую директорию
WORKDIR /backend

# Копируем package.json и package-lock.json (если есть)
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY backend ./

# Открываем порт API
EXPOSE 3000

# Команда для запуска (но она переопределяется в docker-compose.yml)
CMD ["npm", "start"]
