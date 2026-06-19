'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'user',
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false },
);

module.exports = {
  User,
};
