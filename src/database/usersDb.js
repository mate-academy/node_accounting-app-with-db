'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./mainDb');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  User,
};
