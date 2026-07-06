'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  User,
};
