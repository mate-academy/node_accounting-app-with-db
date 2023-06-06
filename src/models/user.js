'use strict';

const { sequelize } = require('../utils/db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tablename: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = { User };
