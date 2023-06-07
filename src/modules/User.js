'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  updatedAt: false,
  createdAt: false,
});

module.exports = {
  User,
};
