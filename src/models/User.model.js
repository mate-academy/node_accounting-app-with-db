'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

User.addHook('beforeBulkDestroy', async (options) => {
  if (options.truncate) {
    await sequelize.query('TRUNCATE "users" CASCADE');
    options.truncate = false; // запобігаємо повторному truncate
  }
});

module.exports = { User };
