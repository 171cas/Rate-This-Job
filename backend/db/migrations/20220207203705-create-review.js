'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      businessId: {
        type: Sequelize.INTEGER,
        references: { model: 'Businesses' },
      },
      fieldId: {
        type: Sequelize.INTEGER,
        references: { model: 'Fields' },
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      context: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
