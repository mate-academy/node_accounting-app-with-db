'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };
