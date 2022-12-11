'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../data/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users',
});

User.sync();

module.exports = { User };
