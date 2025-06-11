'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(`SELECT COUNT(*) FROM "Users"`);
    const count = parseInt(users[0][0].count, 10);

    if (count === 0) {
      const hashedPassword = await bcrypt.hash("u4l1leg@cy@!", 10);

      await queryInterface.bulkInsert("Users", [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          email: "leg4cyl1nk@gmail.com",
          password: hashedPassword,
          name: "Legacy Link",
          role: "admin",
          photo: '/uploads/users/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", { email: "leg4cyl1nk@gmail.com" });
  },
};
