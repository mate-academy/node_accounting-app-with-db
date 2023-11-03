'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Users = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {}
);

module.exports = Users;
