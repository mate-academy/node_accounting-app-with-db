'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db.js');
const User = require('../User/User.model.js');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isPositive(value) {
        if (value <= 0) {
          throw Error('Amount must be greater than zero.');
        }
      },
    },
  },
  category: {
    type: DataTypes.STRING(64),
  },
  note: {
    type: DataTypes.STRING,
  },
});

module.exports = Expense;
