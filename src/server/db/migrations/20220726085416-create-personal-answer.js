'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PersonalAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      chosenOption: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('PersonalAnswers', {
      fields: ['userId', 'questionId'],
      type: 'unique',
      name: 'userAnsweredPersonalQuestion'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PersonalAnswers');
  }
};
