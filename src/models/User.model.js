'use strict';

const { Sequelize } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
);

module.exports = {
  User,
};
