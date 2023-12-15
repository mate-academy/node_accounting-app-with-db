'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const USER = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  USER,
};
