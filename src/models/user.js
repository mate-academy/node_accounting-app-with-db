'use strict';

const { DataTypes } = require('sequelize');
const { dbInit } = require('../utils/db.js');

const db = dbInit();

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tablename: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = { User };
