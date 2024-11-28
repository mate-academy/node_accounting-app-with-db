'use strict';

const { sequelize } = require('../db.js');
// const { User } = require('./User.model.js');

const Expense = sequelize.define(
  'Expense',
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
    category: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
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
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  Expense,
};
