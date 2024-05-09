'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
// const { User } = require('./User.model.js');

const Expense = sequelize.define('Expenses', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  note: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

// Expense.belongsTo(User, {
//   foreignKey: 'userId',
// });

// User.hasMany(Expense, {
//   foreignKey: 'userId',
// });

// (async () => {
//   await Expense.sync({ force: true });
// })();

module.exports = {
  Expense,
};
