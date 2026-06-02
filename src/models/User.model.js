'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  // your code goes here
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

module.exports = {
  User,
};
