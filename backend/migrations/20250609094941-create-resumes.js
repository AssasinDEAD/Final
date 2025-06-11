'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resumes', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      experience: Sequelize.ARRAY(Sequelize.JSONB),
      skills: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: false },
      languages: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: false },
      additionalInfo: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Resumes');
  }
};
