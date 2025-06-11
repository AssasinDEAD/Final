'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Создаём расширение uuid-ossp, если оно ещё не создано.
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  },

  async down(queryInterface, Sequelize) {
    // При откате удаляем расширение, если существует.
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
};
