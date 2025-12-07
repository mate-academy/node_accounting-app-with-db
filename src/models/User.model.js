'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

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
    updatedAt: false,
    createdAt: false,
  },
);

const normalizeUser = ({ id, name }) => ({ id, name });

const normalizeUsers = (usersArray) => {
  const normalized = usersArray
    .filter((user) => user)
    .map((user) => normalizeUser(user.get({ plain: true })));

  return normalized.length === 1 ? normalized[0] : normalized;
};

module.exports = {
  User,
  normalizeUsers,
};
