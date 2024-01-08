'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../services/db.js');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categories',
  updatedAt: false,
});

module.exports = {
  Category,
};
