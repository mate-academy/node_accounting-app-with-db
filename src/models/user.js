'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db-users.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = { User };
