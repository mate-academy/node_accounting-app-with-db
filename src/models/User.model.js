'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users'
});

module.exports = {
  User,
};
