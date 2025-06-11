'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyProfiles', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      companyName: { type: Sequelize.STRING, allowNull: false },
      address: Sequelize.STRING,
      phone: Sequelize.STRING,
      directorFullName: Sequelize.STRING,
      canProvideInternship: { type: Sequelize.BOOLEAN, defaultValue: false },
      BIN:  { type: Sequelize.STRING, allowNull: true },
      BIK:  { type: Sequelize.STRING, allowNull: true },
      KBE:  { type: Sequelize.STRING, allowNull: true },
      BANK:  { type: Sequelize.STRING, allowNull: true },
      representedBy:  { type: Sequelize.STRING, allowNull: true },
      basis:  { type: Sequelize.STRING, allowNull: true },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CompanyProfiles');
  }
};

