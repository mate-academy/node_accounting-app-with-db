'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Category = sequelize.define(
  'category',
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false },
);

module.exports = {
  Category,
};
