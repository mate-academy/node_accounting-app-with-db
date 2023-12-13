'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../services/db');

const userModel = sequelize.define('userModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'users',
});

module.exports = {
  userModel,
};
