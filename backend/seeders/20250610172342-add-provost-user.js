'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Выполняем запрос для проверки наличия пользователя с данным email
    const [results] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'provost.office@narxoz.kz';`
    );

    if (results.length === 0) {
      // Если записи нет, хэшируем пароль и вставляем данные
      const hashedPassword = await bcrypt.hash("u4l1hjjg@cy@!", 10);

      await queryInterface.bulkInsert("Users", [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          email: "provost.office@narxoz.kz",
          password: hashedPassword,
          name: "Provost Office",
          role: "career_center",
          photo: '/uploads/users/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log("Пользователь с email provost.office@narxoz.kz уже существует, вставка пропущена.");
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", { email: "provost.office@narxoz.kz" });
  },
};
