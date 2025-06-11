'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contracts', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      uniId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      filePath: { type: Sequelize.STRING, allowNull: false },
      status: {
        type: Sequelize.ENUM("draft", "signedByUser", "signedByEmployer", "signedByUni", "completed"),
        defaultValue: "draft"
      },
      sigexId: Sequelize.STRING,
      studentSignId: Sequelize.STRING,
      companySignId: Sequelize.STRING,
      uniSignId: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Contracts');
  }
};

