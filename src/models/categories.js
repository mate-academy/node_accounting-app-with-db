'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Category = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { tableName: 'categories' });

module.exports = { Category };
