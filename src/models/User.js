'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
});

module.exports = { User };
