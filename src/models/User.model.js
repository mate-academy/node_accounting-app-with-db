'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

const normalizeUser = ({ id, name }) => ({ id, name });

const normalizeUsers = (usersArray) => {
  const normalized = usersArray
    .filter((user) => user)
    .map((user) => {
      const plain =
        typeof user.get === 'function' ? user.get({ plain: true }) : user;

      return normalizeUser(plain);
    });

  if (normalized.length === 0) {
    return null;
  }

  return normalized.length === 1 ? normalized[0] : normalized;
};

module.exports = {
  User,
  normalizeUsers,
};
