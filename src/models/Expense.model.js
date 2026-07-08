'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    spentAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER, // Або FLOAT, якщо суми можуть бути з копійками
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      // allowNull: true за замовчуванням, тому можна не писати
    },
    note: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Це поле обов'язкове згідно з умовами
    },
  },
  {
    tableName: 'expenses',
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
