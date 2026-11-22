'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
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
