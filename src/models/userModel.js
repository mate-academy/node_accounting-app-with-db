'use strict';

const { sequelize } = require('../utils/dbinit');

const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};
