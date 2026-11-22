'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

const originalDestroy = User.destroy.bind(User);

User.destroy = (options = {}) => {
  if (options.truncate) {
    return originalDestroy({
      ...options,
      truncate: false,
      where: {},
    });
  }

  return originalDestroy(options);
};

module.exports = {
  User,
};
