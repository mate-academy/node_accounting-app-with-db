'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    hooks: {
      // Postgres не разрешает TRUNCATE таблицы, на которую ссылается FK
      // (expenses.userId), поэтому для truncate включаем CASCADE.
      beforeBulkDestroy(options) {
        if (options.truncate) {
          options.cascade = true;
        }
      },
    },
  },
);

module.exports = User;
