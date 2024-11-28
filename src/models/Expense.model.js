'use strict';

const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'expense',
  {
    id: {
      type: sequelize.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: sequelize.Sequelize.FLOAT,
      allowNull: false,
    },
    spentAt: {
      type: sequelize.Sequelize.DATE,
      allowNull: false,
    },
    note: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    userId: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    updatedAt: false,
    createdAt: false,
    tableName: 'expenses',
  },
);

module.exports = {
  Expense,
};
