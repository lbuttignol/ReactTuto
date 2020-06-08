'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      0: {
        type: Sequelize.STRING
      },
      1: {
        type: Sequelize.STRING
      },
      2: {
        type: Sequelize.STRING
      },
      3: {
        type: Sequelize.STRING
      },
      4: {
        type: Sequelize.STRING
      },
      5: {
        type: Sequelize.STRING
      },
      6: {
        type: Sequelize.STRING
      },
      7: {
        type: Sequelize.STRING
      },
      8: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      boardId:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Boards');
  }
};