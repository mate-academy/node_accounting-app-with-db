'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expences', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      spentAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expences');
  }
};
