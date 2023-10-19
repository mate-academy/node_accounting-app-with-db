'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./DBConnection');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.TEXT,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

Users.sync();

module.exports = {
  Users,
};
