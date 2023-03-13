'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

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
});

module.exports = { User };
