'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM("student", "company", "career_center", "admin"), allowNull: false },
      photo: { type: Sequelize.STRING, defaultValue: "/uploads/users/default.jpg" },
      loginAttempts: { type: Sequelize.INTEGER, defaultValue: 0 },
      blockedUntil: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
