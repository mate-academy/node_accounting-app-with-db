'use strict';

const { sequelize } = require('../utils/database');
const { DataTypes } = require('sequelize');
const { Expense } = require('./expense');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
  },
}, {
  tableName: 'categories',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  Category,
};
