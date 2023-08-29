'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../sequelize/db');

const User = sequelize.define('User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = User;
