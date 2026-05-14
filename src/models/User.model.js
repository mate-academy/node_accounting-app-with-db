/* eslint-disable prettier/prettier */

'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);

module.exports = {
  User,
};
